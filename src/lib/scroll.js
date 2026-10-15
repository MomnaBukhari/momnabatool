// Smooth scrolling and in-page navigation.

import { gsap, ScrollSmoother, ScrollTrigger, MOTION_OK, prefersReducedMotion } from "./gsap";

let smoother = null;
// True while this file is moving focus itself (see scrollToSection).
let movingFocus = false;

// Old multi-page URLs keep working: /projects lands on the Projects section.
const LEGACY_PATHS = {
  "/about": "about",
  "/experience": "experience",
  "/projects": "projects",
  "/contact": "contact",
  "/recommendations": "recommendations",
};

function navOffset() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--nav-height");
  return (parseInt(value, 10) || 68) + 12;
}

/**
 * Turns on eased scrolling for mouse and trackpad users.
 * Touch devices keep their native momentum, and reduced-motion users get plain scrolling.
 * Returns a cleanup function.
 */
export function initSmoothScroll() {
  const mm = gsap.matchMedia();

  mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.9,
      effects: false,
      // ScrollSmoother jumps to any element that receives focus off-screen, which
      // is right for Tab navigation but would fight the scroll we start ourselves.
      onFocusIn: () => !movingFocus,
    });

    return () => {
      smoother?.kill();
      smoother = null;
    };
  });

  return () => mm.revert();
}

/** Scrolls to a section by id, updates the URL and moves keyboard focus there. */
export function scrollToSection(id, { updateUrl = true, instant = false } = {}) {
  const target = id === "top" ? document.body : document.getElementById(id);
  if (!target) return;

  const animate = !instant && !prefersReducedMotion();

  if (smoother) {
    if (id === "top") smoother.scrollTo(0, animate);
    else smoother.scrollTo(target, animate, `top ${navOffset()}px`);
  } else {
    const top =
      id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - navOffset();
    window.scrollTo({ top, behavior: animate ? "smooth" : "auto" });
  }

  if (updateUrl) {
    const url = id === "top" ? window.location.pathname : `#${id}`;
    window.history.replaceState(null, "", url);
  }

  // Send focus to the section heading so keyboard and screen-reader users land there too.
  const heading = id === "top" ? null : target.querySelector("h2");
  movingFocus = true;
  heading?.focus({ preventScroll: true });
  movingFocus = false;
}

/** On first load, honour a #hash or a legacy path such as /projects. */
export function scrollToInitialTarget() {
  const { pathname, hash } = window.location;
  const legacy = LEGACY_PATHS[pathname.replace(/\/$/, "")];
  const id = legacy || hash.slice(1);

  if (legacy) window.history.replaceState(null, "", `/#${legacy}`);
  if (!id || !document.getElementById(id)) return;

  // Wait a frame so layout and ScrollTrigger measurements are settled.
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    scrollToSection(id, { updateUrl: false, instant: true });
  });
}

/** Jumps to the top of the page instantly (used when changing pages). */
export function scrollToTop() {
  if (smoother) smoother.scrollTop(0);
  window.scrollTo(0, 0);
}

/** Scrolls to an absolute position, smoothly unless the visitor prefers less motion. */
export function scrollToY(y, smooth = true) {
  const animate = smooth && !prefersReducedMotion();
  if (smoother) smoother.scrollTo(y, animate);
  else window.scrollTo({ top: y, behavior: animate ? "smooth" : "auto" });
}

/** Stops the page scrolling while the mobile menu is open. */
export function lockScroll(locked) {
  if (smoother) smoother.paused(locked);
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
