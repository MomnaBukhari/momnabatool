import { createContext, useCallback, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../../lib/gsap";
import { scrollToTop } from "../../lib/scroll";
import "./PageTransition.css";

const TransitionContext = createContext(() => {});

/**
 * Moving between pages: three coloured curtains sweep up, the page changes
 * behind them, then they sweep away. The label shows where you're going.
 */
export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const busy = useRef(false);

  const go = useCallback(
    (to, label = "") => {
      if (busy.current) return;
      const root = rootRef.current;
      const panels = root.querySelectorAll(".curtain__panel");

      if (prefersReducedMotion()) {
        navigate(to);
        scrollToTop();
        return;
      }

      busy.current = true;
      labelRef.current.textContent = label;

      gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .set(root, { visibility: "visible" })
        .fromTo(panels, { yPercent: 100 }, { yPercent: 0, duration: 0.6, stagger: 0.08 })
        .fromTo(labelRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.25")
        .add(() => {
          navigate(to);
          // Let the new page render, then start it from the top (or its #section).
          requestAnimationFrame(() => {
            if (!to.includes("#")) scrollToTop();
            ScrollTrigger.refresh();
          });
        })
        .to(labelRef.current, { autoAlpha: 0, y: -20, duration: 0.3 }, "+=0.2")
        .to(panels, { yPercent: -100, duration: 0.7, stagger: { each: 0.08, from: "end" } }, "<")
        .set(root, { visibility: "hidden" })
        .add(() => {
          busy.current = false;
        });
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div ref={rootRef} className="curtain" aria-hidden="true">
        <span className="curtain__panel" />
        <span className="curtain__panel" />
        <span className="curtain__panel" />
        <p ref={labelRef} className="curtain__label" />
      </div>
    </TransitionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePageTransition = () => useContext(TransitionContext);

/** An internal link that plays the page transition. */
export function TransitionLink({ to, label, children, onClick, ...rest }) {
  const go = usePageTransition();
  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        go(to, label);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
