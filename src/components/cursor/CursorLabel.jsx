import { useEffect, useRef } from "react";
import { MOTION_OK } from "../../lib/gsap";
import "./CursorLabel.css";

/**
 * A small pill that follows the pointer over anything marked
 * data-cursor="Label" (project cards, theme circles, buttons).
 * Desktop only; off for touch screens and reduced motion.
 */
export default function CursorLabel() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia(`${MOTION_OK} and (hover: hover) and (pointer: fine)`).matches) return undefined;
    const label = ref.current;
    let target = { x: -100, y: -100 };
    const position = { x: -100, y: -100 };
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      position.x += (target.x - position.x) * 0.22;
      position.y += (target.y - position.y) * 0.22;
      label.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
    };

    const onMove = (event) => {
      target = { x: event.clientX, y: event.clientY };
      const marked = event.target.closest?.("[data-cursor]");
      if (marked) {
        label.textContent = marked.dataset.cursor;
        label.classList.add("is-visible");
      } else {
        label.classList.remove("is-visible");
      }
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={ref} className="cursor-label" aria-hidden="true" />;
}
