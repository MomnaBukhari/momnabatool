import { Fragment, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import "./WaveText.css";

/**
 * Text whose letters lift softly as the pointer passes over them.
 * Screen readers get the plain text; the letter spans are hidden from them.
 */
export default function WaveText({ text, as: Tag = "span", className = "", ...rest }) {
  const rootRef = useRef(null);

  const onPointerOver = (event) => {
    const letter = event.target.closest?.(".wave__letter");
    if (!letter || prefersReducedMotion() || letter.dataset.busy) return;
    letter.dataset.busy = "1";
    gsap
      .timeline({ onComplete: () => delete letter.dataset.busy })
      .to(letter, { y: "-0.12em", scale: 1.04, color: "var(--accent-ink)", duration: 0.25, ease: "power2.out" })
      .to(letter, { y: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.4)" })
      .to(letter, { color: "inherit", duration: 0.6 }, "<0.1");
  };

  const words = text.split(" ");

  return (
    <Tag ref={rootRef} className={`wave ${className}`} onPointerOver={onPointerOver} {...rest}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <Fragment key={`${word}-${w}`}>
            {w > 0 && " "}
            <span className="wave__word">
              {[...word].map((char, c) => (
                <span key={c} className="wave__letter">
                  {char}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
