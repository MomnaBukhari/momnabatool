import { useCallback, useEffect, useRef, useState } from "react";
import { PiPaperPlaneTilt, PiCopySimple, PiCheck } from "react-icons/pi";
import { prefersReducedMotion } from "../../lib/gsap";
import { profile } from "../../data/profile";

/*
  A tiny API client in the hero. Visitors "call" my portfolio like an API and
  get real facts back as JSON. Nothing goes over the network: the responses are
  written here, from the same true details used everywhere else on the site.
*/
const ENDPOINTS = [
  {
    id: "me",
    method: "GET",
    path: "/v1/momna",
    label: "profile",
    status: "200 OK",
    body: {
      name: profile.name,
      role: "Software Engineer",
      focus: "backend first",
      experience: "almost 5 years",
      core: ["PHP", "Laravel", "MySQL", "REST APIs"],
      also: ["React", "JavaScript", "Python"],
      based_in: profile.location,
      open_to_opportunities: true,
    },
  },
  {
    id: "projects",
    method: "GET",
    path: "/v1/momna/projects?featured=true",
    label: "projects",
    status: "200 OK",
    body: {
      data: [
        { name: "ScanPass", role: "sole engineer", scope: ["system design", "data modelling", "APIs", "deployment"] },
        { name: "Muslim Match Makers", role: "backend developer", scope: ["Laravel REST APIs", "auth + RBAC", "OTP + ID verification", "queues + jobs"] },
        { name: "Inn'vision", role: "full stack", scope: ["role-based dashboards", "booking logic", "OTP verification"] },
      ],
      count: 3,
    },
  },
  {
    id: "stack",
    method: "GET",
    path: "/v1/momna/stack",
    label: "stack",
    status: "200 OK",
    body: {
      backend: ["PHP", "Laravel", "REST API design", "WordPress"],
      data: ["MySQL", "indexing", "query optimisation", "caching"],
      async: ["jobs", "queues", "events", "scheduled tasks"],
      cloud: ["AWS Lambda integration", "Amazon S3"],
      frontend: ["React", "JavaScript", "GSAP"],
      ai: ["Python", "PyTorch", "Transformers", "scikit-learn"],
    },
  },
  {
    id: "education",
    method: "GET",
    path: "/v1/momna/education",
    label: "education",
    status: "200 OK",
    body: {
      data: [
        { degree: "MRes Artificial Intelligence", result: "Distinction", where: "University of Greater Manchester" },
        { degree: "BS Information Technology", result: "Gold Medal, 1st", gpa: 3.79, where: "University of Gujrat" },
      ],
    },
  },
  {
    id: "hello",
    method: "POST",
    path: "/v1/momna/hello",
    label: "say hello",
    status: "201 Created",
    body: {
      message: "Lovely to meet you!",
      email: profile.email,
      linkedin: profile.links.linkedin,
      next: "Open your mail app below",
    },
  },
];

/** JSON as coloured tokens: keys, strings, numbers, booleans, punctuation. */
function tokenize(value) {
  const json = JSON.stringify(value, null, 2);
  const tokens = [];
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|(\btrue\b|\bfalse\b|\bnull\b)|(-?\d+(?:\.\d+)?)|([{}[\],])|(\s+)/g;
  let match;
  while ((match = re.exec(json))) {
    if (match[1]) {
      tokens.push({ t: match[2] ? "key" : "str", v: match[1] });
      if (match[2]) tokens.push({ t: "punc", v: match[2] });
    } else if (match[3]) tokens.push({ t: "bool", v: match[3] });
    else if (match[4]) tokens.push({ t: "num", v: match[4] });
    else if (match[5]) tokens.push({ t: "punc", v: match[5] });
    else tokens.push({ t: "ws", v: match[6] });
  }
  return { tokens, length: json.length, bytes: new Blob([json]).size };
}

/** Cuts a token list off after `count` characters, for the typing effect. */
function slice(tokens, count) {
  const out = [];
  let left = count;
  for (const token of tokens) {
    if (left <= 0) break;
    out.push(left >= token.v.length ? token : { ...token, v: token.v.slice(0, left) });
    left -= token.v.length;
  }
  return out;
}

export default function ApiConsole() {
  const [active, setActive] = useState(ENDPOINTS[0]);
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | sending | done
  const [copied, setCopied] = useState(false);
  const parsed = useRef(tokenize(ENDPOINTS[0].body));
  const raf = useRef(0);
  const timer = useRef(0);
  const touched = useRef(false);

  const send = useCallback((endpoint) => {
    cancelAnimationFrame(raf.current);
    clearTimeout(timer.current);
    parsed.current = tokenize(endpoint.body);
    setActive(endpoint);
    setShown(0);
    setPhase("sending");

    const total = parsed.current.length;
    if (prefersReducedMotion()) {
      setShown(total);
      setPhase("done");
      return;
    }
    // A short "network" pause, then the response types itself out.
    timer.current = setTimeout(() => {
      const start = performance.now();
      const speed = Math.max(0.9, total / 900); // characters per ms, so long replies still finish in about a second
      const tick = (now) => {
        const count = Math.min(total, Math.round((now - start) * speed));
        setShown(count);
        if (count < total) raf.current = requestAnimationFrame(tick);
        else setPhase("done");
      };
      raf.current = requestAnimationFrame(tick);
    }, 380);
  }, []);

  // First call fires once the hello screen lifts; then it tours the endpoints
  // until the visitor clicks anything themselves.
  useEffect(() => {
    let index = 0;
    let tour = 0;
    const start = () => {
      send(ENDPOINTS[0]);
      tour = setInterval(() => {
        if (touched.current) return clearInterval(tour);
        index = (index + 1) % (ENDPOINTS.length - 1);
        send(ENDPOINTS[index]);
      }, 6500);
    };
    if (window.__introDone) start();
    else window.addEventListener("intro:done", start, { once: true });
    return () => {
      window.removeEventListener("intro:done", start);
      clearInterval(tour);
      cancelAnimationFrame(raf.current);
      clearTimeout(timer.current);
    };
  }, [send]);

  const pick = (endpoint) => {
    touched.current = true;
    send(endpoint);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(active.body, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard blocked: nothing to do.
    }
  };

  const visible = slice(parsed.current.tokens, shown);
  const ok = active.status.startsWith("2");

  return (
    <div className="api" data-cursor-grow>
      <div className="api__chrome">
        <span className="api__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="api__title">momna.api — try me</span>
        <span className="api__live">
          <span className="api__pulse" aria-hidden="true" /> live
        </span>
      </div>

      <div className="api__endpoints" role="tablist" aria-label="Endpoints">
        {ENDPOINTS.map((endpoint) => (
          <button
            key={endpoint.id}
            type="button"
            role="tab"
            aria-selected={active.id === endpoint.id}
            className={`api__endpoint api__endpoint--${endpoint.method.toLowerCase()}`}
            onClick={() => pick(endpoint)}
          >
            <span className="api__verb">{endpoint.method}</span>
            {endpoint.label}
          </button>
        ))}
      </div>

      <div className="api__request">
        <span className={`api__method api__method--${active.method.toLowerCase()}`}>{active.method}</span>
        <code className="api__url">{active.path}</code>
        <button type="button" className="api__send" onClick={() => pick(active)} aria-label="Send request again">
          <PiPaperPlaneTilt aria-hidden="true" />
        </button>
      </div>

      <div className="api__meta" aria-live="polite">
        {phase === "sending" && shown === 0 ? (
          <span className="api__waiting">
            <span className="api__spinner" aria-hidden="true" /> sending…
          </span>
        ) : (
          <>
            <span className={`api__status${ok ? "" : " is-warn"}`}>{active.status}</span>
            <span>application/json</span>
            <span>{parsed.current.bytes} B</span>
          </>
        )}
        <button type="button" className="api__copy" onClick={copy} aria-label="Copy response">
          {copied ? <PiCheck aria-hidden="true" /> : <PiCopySimple aria-hidden="true" />}
        </button>
      </div>

      <pre className="api__body" tabIndex={0} aria-label={`Response from ${active.path}`}>
        <code>
          {visible.map((token, i) => (
            <span key={i} className={`j-${token.t}`}>
              {token.v}
            </span>
          ))}
          {phase !== "done" && <span className="api__caret" aria-hidden="true" />}
        </code>
      </pre>

      {active.id === "hello" && phase === "done" && (
        <a
          className="api__mail"
          href={`mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}`}
        >
          Open mail app <PiPaperPlaneTilt aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
