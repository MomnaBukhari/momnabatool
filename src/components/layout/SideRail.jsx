import { useEffect, useId, useRef, useState } from "react";
import { PiPalette } from "react-icons/pi";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { useTheme } from "../../theme/ThemeContext";
import { getTheme } from "../../theme/themes";
import { MediaButtons, ThemeGrid } from "./Controls";
import "./SideRail.css";

/**
 * The controls rail: a slim glass column floating on the left, lined up with
 * the left edge of the navigation bar so both share one invisible margin.
 * It holds the theme picker (which opens beside it), effects, full screen,
 * music and the theme sound. Large screens only; on smaller screens these
 * live in the menu.
 */
export default function SideRail() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const panelId = useId();
  const current = getTheme(theme);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    if (!prefersReducedMotion()) {
      gsap.fromTo(panel, { autoAlpha: 0, x: -14, scale: 0.97 }, { autoAlpha: 1, x: 0, scale: 1, duration: 0.45, ease: "expo.out" });
      gsap.from(panel.querySelectorAll(".theme-card"), { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.025, ease: "power3.out" });
    }
    panel.querySelector('[aria-checked="true"]')?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event) => {
      if (!panel.contains(event.target) && !buttonRef.current.contains(event.target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <aside className="rail" aria-label="Theme and media">
      <div className="rail__bar">
        <button
          ref={buttonRef}
          type="button"
          className="rail__theme"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`Change theme. Current theme: ${current.name}`}
          data-cursor="Themes"
          style={{ "--p-paper": current.swatch[0], "--p-ink": current.swatch[1], "--p-scene": current.swatch[2] }}
          onClick={() => setOpen((value) => !value)}
        >
          <PiPalette aria-hidden="true" />
        </button>
        <span className="rail__divider" aria-hidden="true" />
        <MediaButtons vertical />
      </div>

      <div ref={panelRef} id={panelId} className="rail__panel" hidden={!open}>
        <p className="rail__title">
          Pick a mood <span className="hand">each one changes the whole place</span>
        </p>
        <ThemeGrid onPick={() => setOpen(false)} />
      </div>
    </aside>
  );
}
