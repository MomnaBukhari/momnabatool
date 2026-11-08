import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import "./Manifesto.css";

// Words wrapped in *stars* are highlighted as they light up.
const TEXT =
  "I build the parts of a product you *don't* *see*: the *APIs*, the *data* *models* and the *logic* that keeps everything honest. And I care just as much about the parts you *do*.";

/** One big sentence that lights up word by word as you scroll through it. */
export default function Manifesto() {
  const ref = useRef(null);
  const words = TEXT.split(" ").map((raw) => ({ word: raw.replace(/\*/g, ""), strong: raw.startsWith("*") }));

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const targets = ref.current.querySelectorAll(".manifesto__word");
      gsap.set(targets, { opacity: 0.14 });
      gsap.to(targets, {
        opacity: 1,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 45%", scrub: 0.5 },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="manifesto" aria-label="What I do">
      <div className="container">
        <p className="manifesto__eyebrow">
          <span className="manifesto__dot" aria-hidden="true" /> the short version
        </p>
        <p ref={ref} className="manifesto__text">
          {words.map(({ word, strong }, i) => (
            <span key={i} className={`manifesto__word${strong ? " is-strong" : ""}`}>
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
