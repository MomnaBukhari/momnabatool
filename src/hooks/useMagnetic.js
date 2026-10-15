import { useEffect } from "react";
import { gsap, MOTION_OK } from "../lib/gsap";

/** The element leans towards the pointer while it hovers, then springs back. */
export default function useMagnetic(ref, strength = 0.3) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia(`${MOTION_OK} and (hover: hover)`).matches) return undefined;

    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      gsap.to(element, {
        x: (event.clientX - (rect.left + rect.width / 2)) * strength,
        y: (event.clientY - (rect.top + rect.height / 2)) * strength,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const onLeave = () => gsap.to(element, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, strength]);
}
