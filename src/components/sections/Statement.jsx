import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { statement } from "../../data/highlights";
import "./Statement.css";

/** A big sentence whose words light up one by one as you scroll. */
export default function Statement() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        ref.current.querySelectorAll(".statement__word"),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="statement" aria-label="In short">
      <div className="container">
        <p ref={ref} className="statement__text">
          {statement.split(" ").map((word, index) => (
            <span key={index} className="statement__word">
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
