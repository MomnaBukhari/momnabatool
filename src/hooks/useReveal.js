import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "../lib/gsap";

/**
 * Fades in every [data-reveal] element inside `ref` the first time it scrolls
 * into view. Elements that arrive together are staggered slightly.
 * Nothing is hidden for people who prefer reduced motion or have JS disabled.
 */
export default function useReveal(ref) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const targets = gsap.utils.toArray("[data-reveal]", ref.current);
      // Opacity only, never visibility: hidden content must stay reachable by keyboard.
      gsap.set(targets, { opacity: 0, y: 48 });

      ScrollTrigger.batch(targets, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform",
          }),
      });
    });

    return () => mm.revert();
  }, [ref]);
}
