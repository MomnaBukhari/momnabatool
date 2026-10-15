import { useEffect, useRef } from "react";
import { MOTION_OK } from "../../lib/gsap";
import { readThemeColors } from "../../theme/ThemeContext";
import "./FairyCursor.css";

const MAX_SPARKS = 160;

/**
 * A trail of tiny sparkles behind the mouse, a burst on every click, and a
 * small label that follows the pointer over anything with data-cursor="Label".
 * Desktop only; switched off for touch screens and reduced motion.
 */
export default function FairyCursor() {
  const canvasRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia(`${MOTION_OK} and (hover: hover) and (pointer: fine)`);
    if (!media.matches) return undefined;

    const canvas = canvasRef.current;
    const label = labelRef.current;
    const ctx = canvas.getContext("2d");
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const sparks = [];
    let colors = readThemeColors();
    let frame = 0;
    let last = performance.now();
    let mouse = { x: -100, y: -100 };
    let labelPos = { x: -100, y: -100 };
    let moved = 0;

    const resize = () => {
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const palette = () => [...colors.particles, colors.glint];

    const spawn = (x, y, speed, amount) => {
      for (let i = 0; i < amount && sparks.length < MAX_SPARKS; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = speed * (0.3 + Math.random());
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - speed * 0.3,
          life: 1,
          decay: 0.9 + Math.random() * 1.2,
          size: 1.2 + Math.random() * 2.6,
          star: Math.random() < 0.35,
          color: palette()[Math.floor(Math.random() * 4)],
          spin: Math.random() * Math.PI,
        });
      }
    };

    const drawStar = (x, y, r, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 8; i += 1) {
        const radius = i % 2 === 0 ? r * 2.2 : r * 0.45;
        const a = (i / 8) * Math.PI * 2;
        ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        s.life -= delta * s.decay;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        s.vy += 30 * delta; // drift gently downwards, like dust settling
        s.x += s.vx * delta;
        s.y += s.vy * delta;
        s.spin += delta * 2;
        ctx.globalAlpha = Math.min(1, s.life * 1.4);
        ctx.fillStyle = s.color;
        if (s.star) drawStar(s.x, s.y, s.size * s.life, s.spin);
        else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 0.7 * s.life, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // The hover label trails the pointer slightly.
      labelPos.x += (mouse.x - labelPos.x) * 0.2;
      labelPos.y += (mouse.y - labelPos.y) * 0.2;
      label.style.transform = `translate3d(${labelPos.x}px, ${labelPos.y}px, 0)`;
    };

    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const distance = Math.hypot(event.clientX - mouse.x, event.clientY - mouse.y);
      mouse = { x: event.clientX, y: event.clientY };
      moved += distance;
      if (moved > 14) {
        spawn(mouse.x, mouse.y, 22, 1);
        moved = 0;
      }
      const target = event.target.closest?.("[data-cursor]");
      if (target) {
        label.textContent = target.dataset.cursor;
        label.classList.add("is-visible");
      } else {
        label.classList.remove("is-visible");
      }
    };

    const onDown = (event) => spawn(event.clientX, event.clientY, 160, 22);
    const onTheme = () => (colors = readThemeColors());

    resize();
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("themechange", onTheme);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fairy-cursor" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  );
}
