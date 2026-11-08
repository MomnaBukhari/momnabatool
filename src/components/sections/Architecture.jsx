import { useRef, useState } from "react";
import { PiPlay, PiArrowCounterClockwise, PiDeviceMobile } from "react-icons/pi";
import Section from "../layout/Section";
import { TechIcon } from "../../lib/techIcons";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import "./Architecture.css";

/*
  Under the hood of Muslim Match Makers: the backend I built, drawn as a system.
  Every note is taken from the project and experience details elsewhere on the
  site. The request trace is an illustration of how a typical call moves
  through those parts, not a recording.
*/
const NODES = [
  {
    id: "app",
    x: 100,
    y: 280,
    title: "Flutter app",
    tag: "client",
    icon: "mobile",
    note: "Built by the Flutter developers. I worked with them, and with an AI/ML team, day to day on the API it talks to.",
  },
  {
    id: "api",
    x: 380,
    y: 280,
    title: "Laravel REST API",
    tag: "what I built",
    icon: "Laravel",
    core: true,
    note: "The APIs the app runs on. Multi-step forms with progress tracking so people resume from their last step, premium membership logic, and profile display rules: batches of 10, no repeats within 24 hours.",
  },
  {
    id: "auth",
    x: 380,
    y: 80,
    title: "Auth & access",
    tag: "security",
    icon: "Token-based authentication",
    note: "Token-based authentication, role-based access control, OTP and ID verification, and server-side validation.",
  },
  {
    id: "cache",
    x: 640,
    y: 150,
    title: "Cache",
    tag: "performance",
    icon: "Caching",
    note: "Caching, alongside indexing and query optimisation, to keep reads fast.",
  },
  {
    id: "db",
    x: 860,
    y: 150,
    title: "MySQL",
    tag: "data",
    icon: "MySQL",
    note: "I managed the database, with indexing and query optimisation.",
  },
  {
    id: "queue",
    x: 640,
    y: 430,
    title: "Jobs & queues",
    tag: "background",
    icon: "Jobs and queues",
    note: "Background work handled by jobs, queues, events and scheduled tasks.",
  },
  {
    id: "lambda",
    x: 860,
    y: 330,
    title: "AWS Lambda",
    tag: "cloud",
    icon: "AWS Lambda",
    note: "Integrated Laravel controllers with AWS Lambda functions.",
  },
  {
    id: "s3",
    x: 860,
    y: 480,
    title: "Amazon S3",
    tag: "cloud",
    icon: "Amazon S3",
    note: "Used Amazon S3 alongside the Laravel backend.",
  },
];

const EDGES = [
  ["app", "api"],
  ["api", "auth"],
  ["api", "cache"],
  ["cache", "db"],
  ["api", "queue"],
  ["api", "lambda"],
  ["api", "s3"],
];

// An illustrative request, step by step.
const TRACE = [
  { from: "app", to: "api", log: "request arrives from the Flutter app" },
  { from: "api", to: "auth", log: "token checked, role and permissions verified" },
  { from: "api", to: "cache", log: "cache checked first" },
  { from: "cache", to: "db", log: "on a miss: an indexed MySQL query" },
  { from: "api", to: "queue", log: "slow follow-up work handed to a queued job" },
  { from: "api", to: "app", log: "JSON response back to the app" },
];

const byId = Object.fromEntries(NODES.map((node) => [node.id, node]));

function NodeIcon({ icon }) {
  if (icon === "mobile") return <PiDeviceMobile className="tech-icon" aria-hidden="true" />;
  return <TechIcon name={icon} />;
}

export default function Architecture() {
  const [selected, setSelected] = useState("api");
  const [lit, setLit] = useState([]);
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);
  const packetRef = useRef(null);
  const tlRef = useRef(null);

  const run = () => {
    tlRef.current?.kill();
    setLog([]);
    setLit([]);
    setRunning(true);
    const packet = packetRef.current;
    const reduce = prefersReducedMotion();
    const tl = gsap.timeline({ onComplete: () => setRunning(false) });
    TRACE.forEach((step, i) => {
      const a = byId[step.from];
      const b = byId[step.to];
      tl.call(() => {
        setLit([step.from, step.to]);
        setSelected(step.to === "app" ? "api" : step.to);
        setLog((lines) => [...lines, { n: i + 1, text: step.log }]);
      });
      if (packet) {
        tl.fromTo(
          packet,
          { attr: { cx: a.x, cy: a.y }, opacity: 1 },
          { attr: { cx: b.x, cy: b.y }, duration: reduce ? 0.01 : 0.7, ease: "power2.inOut" }
        );
      }
      tl.to({}, { duration: reduce ? 0.3 : 0.35 });
    });
    tl.call(() => setLit([]));
    if (packet) tl.to(packet, { opacity: 0, duration: 0.3 });
    tlRef.current = tl;
  };

  const current = byId[selected];
  const isLitEdge = (a, b) => lit.includes(a) && lit.includes(b);

  return (
    <Section id="under-the-hood" title="Under the hood" kicker="how the Muslim Match Makers backend fits together" tone="grey">
      <div className="arch" data-reveal>
        <div className="arch__canvas">
          <svg className="arch__wires" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
            {EDGES.map(([a, b]) => (
              <line
                key={`${a}-${b}`}
                x1={byId[a].x}
                y1={byId[a].y}
                x2={byId[b].x}
                y2={byId[b].y}
                className={`arch__wire${isLitEdge(a, b) ? " is-lit" : ""}${selected === a || selected === b ? " is-near" : ""}`}
              />
            ))}
            <circle ref={packetRef} className="arch__packet" r="9" cx="100" cy="280" opacity="0" />
          </svg>

          {NODES.map((node) => (
            <button
              key={node.id}
              type="button"
              className={`arch__node${node.core ? " is-core" : ""}${selected === node.id ? " is-selected" : ""}${
                lit.includes(node.id) ? " is-lit" : ""
              }`}
              style={{ "--x": `${node.x / 10}%`, "--y": `${(node.y / 560) * 100}%` }}
              aria-pressed={selected === node.id}
              onClick={() => setSelected(node.id)}
            >
              <span className="arch__icon">
                <NodeIcon icon={node.icon} />
              </span>
              <span className="arch__text">
                <span className="arch__title">{node.title}</span>
                <span className="arch__tag">{node.tag}</span>
              </span>
            </button>
          ))}
        </div>

        <aside className="arch__panel">
          <div className="arch__detail" key={current.id}>
            <p className="arch__eyebrow">{current.tag}</p>
            <h3>{current.title}</h3>
            <p>{current.note}</p>
          </div>

          <div className="arch__trace">
            <div className="arch__trace-head">
              <span>request trace</span>
              <button type="button" className="arch__run" onClick={run} disabled={running}>
                {log.length && !running ? <PiArrowCounterClockwise aria-hidden="true" /> : <PiPlay aria-hidden="true" />}
                {running ? "Running…" : log.length ? "Replay" : "Send a request"}
              </button>
            </div>
            <ol className="arch__log" aria-live="polite">
              {log.length === 0 && <li className="arch__log-empty">Press send to follow one request through the system.</li>}
              {log.map((line) => (
                <li key={line.n}>
                  <span className="arch__log-n">{line.n}</span>
                  {line.text}
                </li>
              ))}
            </ol>
            <p className="arch__footnote">An illustration of a typical request, not a recording.</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
