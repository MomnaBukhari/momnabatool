import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { readThemeColors } from "../../theme/ThemeContext";
import "./LiquidOrb.css";

/**
 * The liquid-glass orb. Three.js loads after the page paints; until then (or
 * if WebGL isn't available) a CSS version of the orb stands in.
 * `onReady(orb)` hands the scene to the hero so scrolling can drive it.
 */
export default function LiquidOrb({ onReady }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let orb = null;

    import("./orbScene")
      .then(({ createOrb }) => {
        if (cancelled) return;
        orb = createOrb({
          canvas: canvasRef.current,
          container: stageRef.current,
          colors: readThemeColors(),
          reducedMotion: prefersReducedMotion(),
        });
        setLive(true);
        if (!prefersReducedMotion()) {
          gsap.to(orb.params, { intro: 1, duration: 2.2, ease: "expo.out", delay: 0.2 });
        }
        onReady?.(orb);
      })
      .catch(() => {
        // No WebGL: the CSS orb stays.
      });

    const onTheme = () => orb?.setColors(readThemeColors());
    window.addEventListener("themechange", onTheme);

    return () => {
      cancelled = true;
      window.removeEventListener("themechange", onTheme);
      orb?.dispose();
    };
  }, [onReady]);

  return (
    <div ref={stageRef} className={`orb${live ? " is-live" : ""}`} aria-hidden="true">
      <span className="orb__glow" />
      <span className="orb__fallback" />
      <canvas ref={canvasRef} className="orb__canvas" />
    </div>
  );
}
