import { useLayoutEffect, useRef } from "react";
import { PiArrowLeft, PiArrowUpRight, PiDownloadSimple, PiFileZip } from "react-icons/pi";
import { gsap, MOTION_OK } from "../lib/gsap";
import usePageTitle from "../hooks/usePageTitle";
import { cvs, allCvsZip } from "../data/cvs";
import { TransitionLink } from "../components/layout/PageTransition";
import Doodle from "../components/doodles/Doodle";
import "./CvPage.css";

// Each CV sits on the desk at a slightly different angle.
const TILTS = [-2, 1.5, -1];

/** The CV page: three versions of the CV, each to open or download, plus all three at once. */
export default function CvPage() {
  const rootRef = useRef(null);
  usePageTitle("CVs");

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap
        .timeline({ delay: 0.3 })
        .from(rootRef.current.querySelectorAll("[data-enter]"), { opacity: 0, y: 30, duration: 0.9, ease: "expo.out", stagger: 0.08 })
        .from(rootRef.current.querySelectorAll(".cvs__sheet"), { opacity: 0, y: 80, rotation: 0, duration: 1.1, ease: "back.out(1.4)", stagger: 0.12 }, 0.2);
    });
    return () => mm.revert();
  }, []);

  return (
    <main id="main" ref={rootRef} tabIndex={-1} className="cvs graph-paper">
      <div className="container">
        <TransitionLink to="/" label="Home" className="cvs__back" data-enter>
          <PiArrowLeft aria-hidden="true" /> Back home
        </TransitionLink>

        <header className="cvs__header">
          <h1 data-enter>My CVs</h1>
          <p className="cvs__kicker hand" data-enter>
            <Doodle shape="arrow" className="cvs__arrow" />
            three versions, pick the one that fits the role
          </p>
          <a className="cvs__all" href={allCvsZip} download data-enter data-cursor="All three, zipped">
            <PiFileZip aria-hidden="true" /> Download all three
          </a>
        </header>

        <ul className="cvs__grid">
          {cvs.map((cv, index) => (
            <li key={cv.id} className="cvs__item">
              <a
                className="cvs__sheet"
                href={cv.pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--tilt": `${TILTS[index % TILTS.length]}deg` }}
                data-cursor="Open the PDF"
              >
                <span className="tape" aria-hidden="true" />
                <img src={cv.preview} alt={`First page of the ${cv.title} CV`} width="744" height="1053" loading="lazy" />
              </a>

              <div className="cvs__info">
                <p className="cvs__note hand">{cv.note}</p>
                <h2>{cv.title}</h2>
                <p className="cvs__summary">{cv.summary}</p>
                <div className="cvs__actions">
                  <a className="button" href={cv.pdf} download>
                    <PiDownloadSimple aria-hidden="true" /> Download PDF
                  </a>
                  <a className="cvs__open" href={cv.pdf} target="_blank" rel="noopener noreferrer">
                    Open <PiArrowUpRight aria-hidden="true" />
                    <span className="visually-hidden"> the {cv.title} CV in a new tab</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
