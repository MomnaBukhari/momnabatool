import { useLayoutEffect, useRef } from "react";
import { PiArrowLeft, PiArrowUpRight, PiDownloadSimple, PiEnvelopeSimple } from "react-icons/pi";
import { gsap, MOTION_OK } from "../lib/gsap";
import usePageTitle from "../hooks/usePageTitle";
import { statement, cv } from "../data/statement";
import { profile } from "../data/profile";
import { TransitionLink } from "../components/layout/PageTransition";
import "./StatementPage.css";

/** The personal statement, with the CV pinned beside it to open or download. */
export default function StatementPage() {
  const rootRef = useRef(null);
  usePageTitle("Personal statement & CV");

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const root = rootRef.current;
      gsap.from(root.querySelectorAll("[data-enter]"), { opacity: 0, y: 30, duration: 0.9, ease: "expo.out", stagger: 0.08, delay: 0.3 });
      gsap.from(root.querySelector(".statement__sheet"), { opacity: 0, y: 60, rotation: 4, duration: 1.2, ease: "back.out(1.4)", delay: 0.5 });
      // Each chapter brightens as it reaches the middle of the screen.
      root.querySelectorAll(".statement__chapter").forEach((chapter) => {
        gsap.fromTo(
          chapter,
          { opacity: 0.25 },
          { opacity: 1, ease: "none", scrollTrigger: { trigger: chapter, start: "top 85%", end: "top 55%", scrub: true } }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <main id="main" ref={rootRef} tabIndex={-1} className="statement">
      <div className="container">
        <TransitionLink to="/" label="Home" className="statement__back" data-enter>
          <PiArrowLeft aria-hidden="true" /> Back home
        </TransitionLink>

        <div className="statement__layout">
          <article className="statement__text">
            <p className="statement__eyebrow" data-enter>
              {profile.name} · {profile.role}
            </p>
            <h1 data-enter>{statement.title}</h1>
            <p className="statement__intro" data-enter>
              {statement.intro}
            </p>

            <ol className="statement__chapters">
              {statement.chapters.map((chapter, index) => (
                <li key={chapter.title} className="statement__chapter">
                  <span className="statement__num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>{chapter.title}</h2>
                    <p>{chapter.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="statement__sign hand">{statement.signOff}</p>
          </article>

          <aside className="statement__cv" aria-label="My CV">
            <a className="statement__sheet" href={cv.pdf} target="_blank" rel="noopener noreferrer" data-cursor="Open the PDF">
              <img src={cv.preview} alt="First page of my CV" width="744" height="1053" />
            </a>
            <div className="statement__actions">
              <a className="button" href={cv.pdf} download={cv.fileName}>
                <PiDownloadSimple aria-hidden="true" /> Download CV
              </a>
              <a className="statement__link" href={cv.pdf} target="_blank" rel="noopener noreferrer">
                Open <PiArrowUpRight aria-hidden="true" />
              </a>
              <a
                className="statement__link"
                href={`mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}`}
              >
                Email me <PiEnvelopeSimple aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
