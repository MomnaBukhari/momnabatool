import { useEffect, useRef } from "react";
import { useTheme } from "../../theme/ThemeContext";
import { getTheme } from "../../theme/themes";
import { prefersReducedMotion } from "../../lib/gsap";
import { getEffectsEnabled, onEffectsChange } from "../../lib/effects";
import { alphaOf, draw, makeParticle, rand, step, KINDS } from "./particles";
import "./Ambience.css";

const MAX_PARTICLES = 150;

/**
 * The theme's little world: leaves, snow, petals, fireflies and so on drifting
 * across the page, more of them where the pointer moves, a burst on a click.
 * One canvas over everything, never catching clicks. Off for reduced motion,
 * and switchable with the sparkle button in the side rail.
 *
 * Other parts of the site can ask for a burst:
 *   window.dispatchEvent(new CustomEvent("ambience:burst", { detail: { x, y, kind, count } }))
 */
export default function Ambience() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const themeRef = useRef(getTheme(theme));

  useEffect(() => {
    themeRef.current = getTheme(theme);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    let enabled = getEffectsEnabled() && !prefersReducedMotion();
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let ambientDebt = 0;
    let lastPointer = null;
    let moveDebt = 0;

    const small = () => window.innerWidth < 700;
    const color = () => {
      const colors = themeRef.current.effect.colors;
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const add = (particle) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push(particle);
    };

    const spawnAmbient = () => {
      const { kind } = themeRef.current.effect.ambient;
      const motion = KINDS[kind]?.motion;
      const x = rand(-20, width + 20);
      const y = motion === "fall" ? -20 : motion === "rise" ? height + 20 : rand(0, height);
      add(makeParticle(kind, x, y, color()));
    };

    const loop = (time) => {
      frame = requestAnimationFrame(loop);
      // Clamp the step so a backgrounded tab doesn't jump on return.
      const dt = last ? Math.min(Math.max((time - last) / 1000, 0), 0.05) : 0;
      last = time;

      if (enabled) {
        ambientDebt += dt * themeRef.current.effect.ambient.rate * (small() ? 0.5 : 1);
        while (ambientDebt >= 1) {
          spawnAmbient();
          ambientDebt -= 1;
        }
      }

      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        if (!step(p, dt) || p.y > height + 60 || p.y < -80 || p.x < -80 || p.x > width + 80) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = alphaOf(p);
        draw(ctx, p);
        ctx.restore();
      }
    };

    const burst = (x, y, kind, count) => {
      if (!enabled) return;
      const effect = themeRef.current.effect;
      const k = kind ?? effect.burst.kind;
      const n = count ?? effect.burst.count;
      for (let i = 0; i < n; i += 1) add(makeParticle(k, x, y, color(), { burst: true }));
    };

    // Moving the pointer leaves a little trail; how much depends on the distance moved.
    const onMove = (event) => {
      if (!enabled) return;
      const point = { x: event.clientX, y: event.clientY };
      if (lastPointer) {
        moveDebt += Math.hypot(point.x - lastPointer.x, point.y - lastPointer.y) / 100;
        const { kind, rate } = themeRef.current.effect.touch;
        while (moveDebt * rate >= 1) {
          add(makeParticle(kind, point.x + rand(-6, 6), point.y + rand(-6, 6), color(), { touch: true }));
          moveDebt -= 1 / rate;
        }
      }
      lastPointer = point;
    };

    const onDown = (event) => {
      if (event.target.closest?.("input, textarea, select")) return;
      burst(event.clientX, event.clientY);
    };
    const onBurst = (event) => {
      const { x, y, kind, count } = event.detail ?? {};
      burst(x, y, kind, count);
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame) {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    };
    const stopEffects = onEffectsChange((on) => {
      enabled = on && !prefersReducedMotion();
      if (!enabled) particles.length = 0;
    });

    resize();
    frame = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("ambience:burst", onBurst);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      stopEffects();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("ambience:burst", onBurst);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambience" aria-hidden="true" />;
}
