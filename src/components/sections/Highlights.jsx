import { useLayoutEffect, useRef } from "react";
import { PiArrowCounterClockwise } from "react-icons/pi";
import Section from "../layout/Section";
import { Draggable, gsap, MOTION_OK } from "../../lib/gsap";
import { highlights } from "../../data/highlights";
import "./Highlights.css";

// A gentle, repeating set of tilts so the wall looks hand-pinned but stays tidy.
const TILTS = [-3, 2, -1.5, 3, 2.5, -2, 1.5, -2.5];

export default function Highlights() {
  const wallRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // On a mouse or trackpad, every note can be picked up and moved around the wall.
    mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
      const wall = wallRef.current;
      let top = 10;
      const drags = Draggable.create(wall.querySelectorAll(".sticky"), {
        type: "x,y",
        bounds: wall,
        inertia: true,
        edgeResistance: 0.8,
        zIndexBoost: false,
        onPress() {
          top += 1;
          gsap.set(this.target, { zIndex: top });
          gsap.to(this.target, { scale: 1.05, rotation: 0, boxShadow: "0 30px 40px -20px rgba(0,0,0,0.35)", duration: 0.3 });
        },
        onRelease() {
          const tilt = Number(this.target.dataset.tilt);
          gsap.to(this.target, { scale: 1, rotation: tilt, boxShadow: "", duration: 0.5, ease: "back.out(2)" });
        },
      });
      wall.classList.add("is-draggable");
      return () => {
        drags.forEach((drag) => drag.kill());
        wall.classList.remove("is-draggable");
      };
    });

    return () => mm.revert();
  }, []);

  // Puts every note back where it started.
  const tidy = () => {
    const notes = wallRef.current.querySelectorAll(".sticky");
    gsap.to(notes, {
      x: 0,
      y: 0,
      rotation: (index) => TILTS[index % TILTS.length],
      duration: 0.8,
      ease: "back.out(1.4)",
      stagger: 0.04,
    });
  };

  return (
    <Section id="glance" title="At a glance" kicker="the short version, pinned up" tone="grey" className="glance">
      <div className="glance__wall graph-paper">
        <ul ref={wallRef} className="glance__notes">
          {highlights.map((note, index) => {
            const tilt = TILTS[index % TILTS.length];
            return (
              <li
                key={note.big}
                className="sticky sticky-note"
                data-tilt={tilt}
                data-cursor-drag
                data-reveal
                style={{ "--note-color": `var(--note-${(index % 4) + 1})`, "--tilt": `${tilt}deg` }}
              >
                {index % 2 === 0 ? <span className="tape" aria-hidden="true" /> : <span className="pin" aria-hidden="true" />}
                <p className="sticky__big hand">{note.big}</p>
                <p className="sticky__small">{note.small}</p>
              </li>
            );
          })}
        </ul>
        <button type="button" className="glance__tidy" onClick={tidy}>
          <PiArrowCounterClockwise aria-hidden="true" /> Tidy up the wall
        </button>
      </div>
    </Section>
  );
}
