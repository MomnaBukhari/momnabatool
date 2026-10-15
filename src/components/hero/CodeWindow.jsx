import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "../../lib/gsap";

// A small Laravel routes file, written out line by line. Each line is a list
// of [kind, text] tokens; kind picks the colour (see .code-window in Hero.css).
const LINES = [
  [["k", "Route"], ["p", "::"], ["f", "middleware"], ["p", "(["], ["s", "'auth'"], ["p", ", "], ["s", "'role:admin'"], ["p", "])->"], ["f", "group"], ["p", "("], ["k", "function"], ["p", " () {"]],
  [["c", "    // members, checked on the server"]],
  [["k", "    Route"], ["p", "::"], ["f", "apiResource"], ["p", "("], ["s", "'members'"], ["p", ", "], ["t", "MemberController"], ["p", "::"], ["k", "class"], ["p", ");"]],
  [["k", "    Route"], ["p", "::"], ["f", "post"], ["p", "("], ["s", "'verify/otp'"], ["p", ", ["], ["t", "OtpController"], ["p", "::"], ["k", "class"], ["p", ", "], ["s", "'verify'"], ["p", "]);"]],
  [["p", "});"]],
];

/** A little editor window that types out a Laravel route group after the hello screen. */
export default function CodeWindow() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const lines = ref.current.querySelectorAll(".code-window__line");
      const typing = gsap.timeline({ paused: true, delay: 0.5 });
      lines.forEach((line) => {
        const length = line.textContent.length;
        typing.fromTo(
          line,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: Math.max(length * 0.012, 0.1), ease: `steps(${Math.max(length, 1)})` }
        );
      });
      const play = () => typing.play();
      if (window.__introDone) play();
      else window.addEventListener("intro:done", play, { once: true });
      return () => window.removeEventListener("intro:done", play);
    });
    return () => mm.revert();
  }, []);

  return (
    <figure ref={ref} className="code-window">
      <figcaption className="code-window__bar">
        <span className="code-window__lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="code-window__file">routes/api.php</span>
      </figcaption>
      <pre className="code-window__code" aria-label="A Laravel route group with authentication, a role check and OTP verification">
        <code>
          {LINES.map((tokens, index) => (
            <span key={index} className="code-window__row">
              <span className="code-window__num" aria-hidden="true">
                {index + 1}
              </span>
              <span className="code-window__line">
                {tokens.map(([kind, text], tokenIndex) => (
                  <span key={tokenIndex} className={`tok-${kind}`}>
                    {text}
                  </span>
                ))}
              </span>
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
