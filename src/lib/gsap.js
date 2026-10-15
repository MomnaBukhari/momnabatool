// One place to register GSAP plugins and set defaults.
// Import gsap from here, not from "gsap", so plugins are always registered.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Draggable, InertiaPlugin);
gsap.defaults({ ease: "power3.out", duration: 0.8 });

// Media queries used with gsap.matchMedia(), so every animation
// is skipped for people who ask their system for reduced motion.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION).matches;

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Draggable };
