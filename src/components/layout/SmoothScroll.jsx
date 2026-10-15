import { useLayoutEffect } from "react";
import { initSmoothScroll } from "../../lib/scroll";

/**
 * Turns on smooth scrolling. Renders nothing.
 * It sits first in <App /> so its effect runs before any section creates a
 * scroll-linked animation, which is the order GSAP expects.
 */
export default function SmoothScroll() {
  useLayoutEffect(() => initSmoothScroll(), []);
  return null;
}
