import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";

/**
 * Cycles through a few words, each one rolling up letter by letter.
 * Screen readers get the whole list once instead of a moving target.
 */
export default function WordRotator({ words, interval = 2600 }) {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => setIndex((value) => (value + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".rotator__char"),
      { yPercent: 110, opacity: 0, rotateX: -80 },
      { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.7, ease: "expo.out", stagger: 0.022 }
    );
  }, [index]);

  return (
    <span className="rotator">
      <span ref={ref} className="rotator__word" aria-hidden="true" key={index}>
        {[...words[index]].map((char, i) => (
          <span key={i} className="rotator__char">
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
      <span className="visually-hidden">{words.join(", ")}</span>
    </span>
  );
}
