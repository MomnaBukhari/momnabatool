import { useEffect } from "react";
import { gsap, MOTION_OK } from "../lib/gsap";

/**
 * Tilts the element in 3D towards the pointer and sets --shine-x / --shine-y
 * (0–100%) so CSS can draw a soft highlight where the light would catch it.
 */
export default function useTilt(ref, { max = 9 } = {}) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia(`${MOTION_OK} and (hover: hover)`).matches) return undefined;

    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      element.style.setProperty("--shine-x", `${px * 100}%`);
      element.style.setProperty("--shine-y", `${py * 100}%`);
      gsap.to(element, {
        rotateY: (px - 0.5) * max * 2,
        rotateX: -(py - 0.5) * max * 1.6,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power3.out",
      });
    };
    const onLeave = () =>
      gsap.to(element, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.45)" });

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, max]);
}
