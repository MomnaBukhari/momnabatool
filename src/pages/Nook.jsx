import { useLayoutEffect, useRef } from "react";
import { PiArrowLeft, PiArrowUpRight, PiSparkle } from "react-icons/pi";
import { gsap, MOTION_OK } from "../lib/gsap";
import usePageTitle from "../hooks/usePageTitle";
import useTilt from "../hooks/useTilt";
import { nook } from "../data/profile";
import { nookItems } from "../nook/items";
import { TransitionLink } from "../components/layout/PageTransition";
import "./Nook.css";

/** The Nook: a cozy page for small, fun experiments. Add them in src/nook/items.js. */
export default function Nook() {
  const rootRef = useRef(null);
  usePageTitle(nook.title);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(rootRef.current.querySelectorAll("[data-enter]"), {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.6)",
        delay: 0.35,
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <main id="main" ref={rootRef} tabIndex={-1} className="nook">
      <div className="container">
        <TransitionLink to="/" label="Home" className="nook__back" data-enter>
          <PiArrowLeft aria-hidden="true" /> Back home
        </TransitionLink>

        <header className="nook__header">
          <h1 className="nook__title gradient-text" data-enter>
            {nook.title}
          </h1>
          <p className="nook__intro" data-enter>
            {nook.intro}
          </p>
        </header>

        {nookItems.length > 0 ? (
          <ul className="nook__grid">
            {nookItems.map((item) => (
              <NookCard key={item.title} item={item} />
            ))}
          </ul>
        ) : (
          <div className="nook__empty" data-enter>
            <span className="nook__empty-icon" aria-hidden="true">
              <PiSparkle />
            </span>
            <h2>Nothing on the shelf just yet</h2>
            <p>Small, silly, lovely things are being made. Come back soon, and bring a biscuit.</p>
          </div>
        )}
      </div>
    </main>
  );
}

function NookCard({ item }) {
  const ref = useRef(null);
  useTilt(ref, { max: 10 });
  const external = /^https?:\/\//.test(item.url);

  return (
    <li ref={ref} className="nook__card" data-enter>
      <a
        href={item.url}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        data-cursor="Have a play"
      >
        <h2>{item.title}</h2>
        {item.description && <p>{item.description}</p>}
        <span className="nook__card-foot">
          {item.date && <span>{item.date}</span>}
          <PiArrowUpRight aria-hidden="true" />
        </span>
      </a>
    </li>
  );
}
