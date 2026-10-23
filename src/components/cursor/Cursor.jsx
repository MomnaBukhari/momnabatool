import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import "./Cursor.css";

// What the cursor turns into, checked in this order:
// something magic ([data-cursor-magic])  → a glowing star of light that sheds sparkles
// a label ([data-cursor="View project"]) → a filled circle with the words in it
// a sticky note ([data-cursor-drag])       → a soft rounded square saying "Drag"
// a text field                             → a blinking text caret
// a link or button                         → a ring that swells around it
// a card or panel (CARD below)             → a big, soft circle
const LINK = "a, button, [role='button'], [role='radio'], label, summary, select";
const TEXT = "input:not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true']";
const CARD =
  "[data-cursor-grow], .role, .sticky, .pcard, .keys__group, .quote, .credentials__block, .pipeline__step, .about__card, .code-window, .contact__form";

/**
 * A custom cursor: a small ink dot, and a ring that trails it and changes
 * shape with whatever it's over. It stretches a little when you move fast.
 * Mouse and trackpad only; touch screens keep their normal behaviour.
 */
export default function Cursor() {
  const rootRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return undefined;

    const root = rootRef.current;
    const shape = root.querySelector(".cursor__shape");
    const label = root.querySelector(".cursor__label");
    const dot = dotRef.current;
    const calm = prefersReducedMotion();
    document.documentElement.classList.add("has-cursor");

    const lag = calm ? 0 : 0.38;
    const ringX = gsap.quickTo(root, "x", { duration: lag, ease: "power3.out" });
    const ringY = gsap.quickTo(root, "y", { duration: lag, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: calm ? 0 : 0.06, ease: "none" });
    const dotY = gsap.quickTo(dot, "y", { duration: calm ? 0 : 0.06, ease: "none" });

    let state = "";
    let last = { x: 0, y: 0 };
    let visible = false;
    let lastSparkle = 0;

    const setState = (next, text = "") => {
      if (next === state && label.textContent === text) return;
      state = next;
      root.dataset.state = next;
      dot.dataset.state = next;
      label.textContent = text;
    };

    const onMove = (event) => {
      if (!visible) {
        visible = true;
        root.classList.add("is-visible");
        dot.classList.add("is-visible");
        gsap.set([root, dot], { x: event.clientX, y: event.clientY });
      }
      ringX(event.clientX);
      ringY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);

      // A quick flick stretches the ring along the direction of travel.
      if (!calm && state === "") {
        const dx = event.clientX - last.x;
        const dy = event.clientY - last.y;
        const speed = Math.min(Math.hypot(dx, dy) / 40, 0.45);
        gsap.to(shape, {
          rotation: (Math.atan2(dy, dx) * 180) / Math.PI,
          scaleX: 1 + speed,
          scaleY: 1 - speed * 0.5,
          duration: 0.25,
          overwrite: true,
        });
      }
      last = { x: event.clientX, y: event.clientY };

      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      // Something magical (the closed storybook): a glowing wand-light that sheds sparkles.
      const magic = target.closest("[data-cursor-magic]");
      if (magic) {
        const now = performance.now();
        if (now - lastSparkle > 70) {
          lastSparkle = now;
          window.dispatchEvent(
            new CustomEvent("ambience:burst", { detail: { x: event.clientX, y: event.clientY, kind: "sparkle", count: 2 } })
          );
        }
        return setState("magic", magic.dataset.cursorMagic);
      }
      const labelled = target.closest("[data-cursor]");
      if (labelled) return setState("label", labelled.dataset.cursor);
      if (target.closest(".is-draggable [data-cursor-drag]")) return setState("drag", "Drag");
      if (target.closest(TEXT)) return setState("text");
      if (target.closest(LINK)) return setState("link");
      if (target.closest(CARD)) return setState("card");
      return setState("");
    };

    // Any state other than plain resets the stretch.
    const observer = new MutationObserver(() => {
      if (state !== "") gsap.to(shape, { rotation: 0, scaleX: 1, scaleY: 1, duration: 0.3, overwrite: true });
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-state"] });

    const onDown = () => root.classList.add("is-down");
    const onUp = () => root.classList.remove("is-down");
    const onLeave = () => {
      visible = false;
      root.classList.remove("is-visible");
      dot.classList.remove("is-visible");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={rootRef} className="cursor" aria-hidden="true">
        <div className="cursor__shape">
          <span className="cursor__label" />
        </div>
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
