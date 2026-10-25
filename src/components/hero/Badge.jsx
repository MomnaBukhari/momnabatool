import { useLayoutEffect, useRef } from "react";
import { PiEnvelopeSimple, PiGithubLogo, PiLinkedinLogo, PiMapPin } from "react-icons/pi";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { TechIcon } from "../../lib/techIcons";
import { profile } from "../../data/profile";
import "./Badge.css";

// The four facts on the badge: short, true and checkable.
const FACTS = [
  { big: "~5 yrs", small: "in production" },
  { big: "Sole engineer", small: "on ScanPass" },
  { big: "Distinction", small: "MRes in AI" },
  { big: "Gold medal", small: "BS IT, 1st" },
];
const CORE = ["PHP", "Laravel", "MySQL", "React", "Python", "AWS Lambda"];

/**
 * A conference-style name badge on a lanyard: who I am, what I do and how to
 * reach me, at a glance. It drops in after the hello screen, sways gently,
 * and swings a little when the pointer sweeps past.
 */
export default function Badge() {
  const swingRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const swing = swingRef.current;
      // Hidden until the hello screen lifts, then it drops in on its lanyard.
      gsap.set(swing, { yPercent: -120, rotation: -8 });
      const drop = () =>
        gsap
          .timeline()
          .to(swing, { yPercent: 0, duration: 1.1, ease: "back.out(1.2)", delay: 0.3 })
          .to(swing, { rotation: 0, duration: 2.2, ease: "elastic.out(1, 0.25)" }, "<0.2");
      if (window.__introDone) drop();
      else window.addEventListener("intro:done", drop, { once: true });

      // A sweep of the pointer gives it a nudge, then it settles like a real badge.
      let lastX = null;
      const onMove = (event) => {
        if (lastX !== null) {
          const push = Math.max(-9, Math.min(9, (event.clientX - lastX) * 0.25));
          if (Math.abs(push) > 0.6) {
            gsap.to(swing, { rotation: push, duration: 0.35, ease: "power2.out", overwrite: true, onComplete: settle });
          }
        }
        lastX = event.clientX;
      };
      const settle = () => gsap.to(swing, { rotation: 0, duration: 2.4, ease: "elastic.out(1, 0.2)" });
      const hero = swing.closest(".hero");
      hero?.addEventListener("pointermove", onMove);
      return () => {
        window.removeEventListener("intro:done", drop);
        hero?.removeEventListener("pointermove", onMove);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="badge-wrap">
      <div ref={swingRef} className="badge-swing">
        <span className="badge__strap" aria-hidden="true" />
        <article className="badge" aria-label="Profile card">
          <span className="badge__clip" aria-hidden="true" />

          <header className="badge__head">
            <p className="badge__event">Portfolio · 2026</p>
            <p className="badge__status">
              <span className="badge__pulse" aria-hidden="true" />
              Open to opportunities
            </p>
          </header>

          <div className="badge__who">
            <span className="badge__avatar" aria-hidden="true">
              {profile.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </span>
            <div>
              <h2 className="badge__name">{profile.name}</h2>
              <p className="badge__role">Software Engineer, backend first</p>
              <p className="badge__place">
                <PiMapPin aria-hidden="true" /> {profile.location}
              </p>
            </div>
          </div>

          <dl className="badge__facts">
            {FACTS.map((fact) => (
              <div key={fact.big}>
                <dt>{fact.big}</dt>
                <dd>{fact.small}</dd>
              </div>
            ))}
          </dl>

          <ul className="badge__stack" aria-label="Core stack">
            {CORE.map((item) => (
              <li key={item} title={item}>
                <TechIcon name={item} />
                <span className="visually-hidden">{item}</span>
              </li>
            ))}
          </ul>

          <footer className="badge__foot">
            <span className="badge__code" aria-hidden="true" />
            <nav className="badge__links" aria-label="Find me">
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <PiEnvelopeSimple aria-hidden="true" />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <PiLinkedinLogo aria-hidden="true" />
              </a>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <PiGithubLogo aria-hidden="true" />
              </a>
            </nav>
          </footer>
        </article>
      </div>
    </div>
  );
}
