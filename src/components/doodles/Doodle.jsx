import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import "./Doodle.css";

// Hand-drawn marks, drawn in ink the first time they scroll into view.
// Each is one or more strokes in its own little canvas (viewBox).
const SHAPES = {
  underline: {
    viewBox: "0 0 320 26",
    paths: ["M4 17 C 70 6, 150 4, 214 9 S 296 18, 316 9"],
  },
  underline2: {
    viewBox: "0 0 320 30",
    paths: ["M6 12 C 90 4, 200 4, 312 10", "M30 24 C 110 16, 210 16, 280 21"],
  },
  circle: {
    viewBox: "0 0 320 90",
    paths: ["M168 9 C 80 3, 10 20, 10 46 C 10 74, 110 86, 214 80 C 300 74, 320 44, 286 24 C 246 4, 150 4, 96 14"],
  },
  arrow: {
    viewBox: "0 0 120 70",
    paths: ["M8 62 C 20 26, 52 10, 104 16", "M88 4 L 106 16 L 90 30"],
  },
  arrowDown: {
    viewBox: "0 0 70 110",
    paths: ["M14 6 C 54 24, 54 62, 30 98", "M18 84 L 30 100 L 46 88"],
  },
  sparkle: {
    viewBox: "0 0 40 40",
    paths: ["M20 3 C 21 14, 26 19, 37 20 C 26 21, 21 26, 20 37 C 19 26, 14 21, 3 20 C 14 19, 19 14, 20 3 Z"],
  },
  heart: {
    viewBox: "0 0 40 38",
    paths: ["M20 34 C 4 22, 1 10, 10 5 C 16 2, 20 8, 20 12 C 20 8, 24 2, 30 5 C 39 10, 36 22, 20 34 Z"],
  },
  squiggle: {
    viewBox: "0 0 120 20",
    paths: ["M3 12 C 11 2, 19 2, 23 10 S 35 18, 43 10 S 55 2, 63 10 S 75 18, 83 10 S 95 2, 103 10 S 113 16, 117 10"],
  },
  // A little mehndi-style flower: five petals around a dot.
  flower: {
    viewBox: "0 0 60 60",
    paths: [
      "M30 26 C 24 16, 26 6, 30 4 C 34 6, 36 16, 30 26",
      "M33 28 C 41 20, 52 20, 55 24 C 54 29, 44 33, 33 30",
      "M32 33 C 40 40, 42 51, 38 55 C 33 54, 30 44, 30 34",
      "M28 33 C 22 43, 18 54, 22 55 C 17 52, 18 41, 27 33",
      "M27 29 C 17 30, 7 26, 5 22 C 9 18, 19 20, 27 27",
      "M30 30 m -2.5 0 a 2.5 2.5 0 1 0 5 0 a 2.5 2.5 0 1 0 -5 0",
    ],
  },
};

/**
 * <Doodle shape="underline" className="..." />
 * Decorative only: hidden from screen readers. Position it with CSS.
 * `delay` holds the drawing back (seconds); `onLoad` draws on page load
 * instead of on scroll (for the hero).
 */
export default function Doodle({ shape, className = "", delay = 0, onLoad = false, fill = false }) {
  const ref = useRef(null);
  const { viewBox, paths } = SHAPES[shape];
  // Lines that stretch to fit their box can't use a non-scaling stroke (it can't be measured
  // for drawing), so they scale with the box instead, which reads like a real pen.
  const stretch = shape.startsWith("underline") || shape === "circle";

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const strokes = ref.current.querySelectorAll("path");
      const tween = {
        drawSVG: "0%",
        duration: 1.1,
        ease: "power2.inOut",
        stagger: 0.18,
        delay,
      };
      if (onLoad) {
        // Waits for the hello screen to finish (see Loader).
        gsap.set(strokes, { drawSVG: "0%" });
        const play = () => gsap.to(strokes, { drawSVG: "100%", duration: 1.1, ease: "power2.inOut", stagger: 0.18, delay });
        if (window.__introDone) play();
        else window.addEventListener("intro:done", play, { once: true });
        return () => window.removeEventListener("intro:done", play);
      }
      gsap.from(strokes, {
        ...tween,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
      return undefined;
    });
    return () => mm.revert();
  }, [delay, onLoad]);

  return (
    <svg
      ref={ref}
      className={`doodle doodle--${shape}${fill ? " doodle--fill" : ""} ${className}`.trim()}
      viewBox={viewBox}
      preserveAspectRatio={stretch ? "none" : "xMidYMid meet"}
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d) => (
        <path key={d} d={d} vectorEffect={stretch ? undefined : "non-scaling-stroke"} />
      ))}
    </svg>
  );
}
