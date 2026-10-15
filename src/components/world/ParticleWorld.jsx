import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { prefersReducedMotion, ScrollTrigger } from "../../lib/gsap";
import { readThemeColors } from "../../theme/ThemeContext";
import "./ParticleWorld.css";

const WorldContext = createContext({ show: () => {} });

/**
 * The fixed canvas of particles behind every page. Three.js is loaded after
 * the page paints. Anything can ask for a shape with useWorld().show(name, where).
 */
export function ParticleWorldProvider({ children }) {
  const canvasRef = useRef(null);
  const worldRef = useRef(null);
  // Remember the latest request so it applies once the world has loaded.
  const pendingRef = useRef(["mandala", "hero"]);

  useEffect(() => {
    let cancelled = false;
    let world = null;

    const count = window.innerWidth < 700 ? 6500 : navigator.hardwareConcurrency <= 4 ? 9000 : 14000;

    import("./worldScene")
      .then(({ createWorld }) => {
        if (cancelled) return;
        world = createWorld({
          canvas: canvasRef.current,
          count,
          reducedMotion: prefersReducedMotion(),
          colors: readThemeColors(),
        });
        worldRef.current = world;
        world.show(...pendingRef.current);
        canvasRef.current.classList.add("is-ready");
      })
      .catch(() => {
        // No WebGL: the aurora background still shows, and nothing else breaks.
      });

    const onTheme = () => world?.setColors(readThemeColors());
    const onClick = (event) => world?.ripple(event.clientX, event.clientY);
    window.addEventListener("themechange", onTheme);
    window.addEventListener("pointerdown", onClick);

    return () => {
      cancelled = true;
      window.removeEventListener("themechange", onTheme);
      window.removeEventListener("pointerdown", onClick);
      world?.dispose();
      worldRef.current = null;
    };
  }, []);

  const show = useCallback((name, where) => {
    pendingRef.current = [name, where];
    worldRef.current?.show(name, where);
  }, []);

  return (
    <WorldContext.Provider value={{ show }}>
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <canvas ref={canvasRef} className="world" aria-hidden="true" />
      {children}
    </WorldContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWorld = () => useContext(WorldContext);

/**
 * Watches every element with data-shape inside `rootRef` and switches the
 * particles to that shape while the element fills the middle of the screen.
 * Optional data-place: hero | left | right | center.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useShapesOnScroll(rootRef, deps = []) {
  const { show } = useWorld();

  useEffect(() => {
    const elements = rootRef.current?.querySelectorAll("[data-shape]") ?? [];
    const triggers = [...elements].map((element) =>
      ScrollTrigger.create({
        trigger: element,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) show(element.dataset.shape, element.dataset.place || "left");
        },
      })
    );
    return () => triggers.forEach((trigger) => trigger.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, rootRef, ...deps]);
}
