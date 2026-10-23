// How each kind of particle moves and how it's drawn on the canvas.
// Every particle is drawn around (0, 0) at its own size `s`; the engine has
// already moved, rotated and faded the canvas for it.

const TAU = Math.PI * 2;
const rand = (min, max) => min + Math.random() * (max - min);

// motion: "fall" drifts down and sways, "rise" floats up, "float" hangs about.
export const KINDS = {
  leaf: { motion: "fall", size: [7, 13], speed: [28, 60], life: [9, 16], spin: 1.6, sway: 40, flutter: true },
  petal: { motion: "fall", size: [5, 9], speed: [22, 46], life: [9, 16], spin: 1.2, sway: 34, flutter: true },
  snow: { motion: "fall", size: [3, 7], speed: [22, 48], life: [12, 22], spin: 0.6, sway: 22 },
  marigold: { motion: "fall", size: [4, 7], speed: [26, 50], life: [9, 15], spin: 1.4, sway: 26 },
  blossom: { motion: "fall", size: [5, 8], speed: [20, 40], life: [10, 18], spin: 1, sway: 30 },
  feather: { motion: "fall", size: [9, 15], speed: [12, 24], life: [16, 26], spin: 0.5, sway: 60, flutter: true },
  bubble: { motion: "rise", size: [3, 9], speed: [24, 50], life: [8, 14], spin: 0, sway: 16 },
  firefly: { motion: "rise", size: [2, 4], speed: [8, 22], life: [6, 11], spin: 0, sway: 30, glow: true },
  steam: { motion: "rise", size: [12, 22], speed: [16, 30], life: [6, 10], spin: 0, sway: 12 },
  heart: { motion: "rise", size: [4, 8], speed: [20, 40], life: [4, 7], spin: 0.4, sway: 14 },
  puff: { motion: "float", size: [10, 26], speed: [6, 16], life: [5, 9], spin: 0, sway: 10 },
  sparkle: { motion: "float", size: [3, 7], speed: [10, 40], life: [0.9, 1.8], spin: 2, sway: 0 },
  pearl: { motion: "float", size: [2, 4], speed: [8, 30], life: [1.2, 2.4], spin: 0, sway: 0 },
  star: { motion: "float", size: [1.5, 4], speed: [0, 6], life: [2.5, 5], spin: 0, sway: 0, twinkle: true },
  mughalStar: { motion: "float", size: [5, 9], speed: [30, 90], life: [1.2, 2.2], spin: 1.5, sway: 0 },
};

export function makeParticle(kind, x, y, color, { burst = false, touch = false } = {}) {
  const spec = KINDS[kind] ?? KINDS.sparkle;
  const size = rand(...spec.size);
  const speed = rand(...spec.speed);
  const p = {
    kind,
    x,
    y,
    size,
    color,
    age: 0,
    life: rand(...spec.life),
    rot: rand(0, TAU),
    spin: rand(-spec.spin, spec.spin),
    phase: rand(0, TAU),
    sway: spec.sway * rand(0.5, 1),
    vx: 0,
    vy: 0,
  };

  if (burst || touch) {
    // Thrown out from the pointer, then settling into the kind's own motion.
    const angle = burst ? rand(0, TAU) : rand(-Math.PI, 0);
    const force = burst ? rand(60, 180) : rand(10, 50);
    p.vx = Math.cos(angle) * force;
    p.vy = Math.sin(angle) * force;
    if (touch) p.life *= 0.7;
  } else if (spec.motion === "fall") {
    p.vy = speed;
  } else if (spec.motion === "rise") {
    p.vy = -speed;
  } else {
    const angle = rand(0, TAU);
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed;
  }
  p.drift = spec.motion === "fall" ? speed : spec.motion === "rise" ? -speed : 0;
  return p;
}

/** Advances one particle by dt seconds. Returns false when it's finished. */
export function step(p, dt) {
  const spec = KINDS[p.kind];
  p.age += dt;
  if (p.age >= p.life) return false;
  // Ease thrown particles back towards their natural drift.
  p.vx += -p.vx * Math.min(1, dt * 1.6);
  p.vy += (p.drift - p.vy) * Math.min(1, dt * 1.2);
  p.phase += dt * 1.6;
  p.x += (p.vx + Math.sin(p.phase) * p.sway * 0.6) * dt;
  p.y += p.vy * dt;
  p.rot += p.spin * dt;
  if (spec.motion === "rise" && p.kind === "steam") p.size += dt * 6;
  return true;
}

/** How visible a particle is right now: fades in, holds, fades out (or twinkles). */
export function alphaOf(p) {
  const t = p.age / p.life;
  const fade = Math.min(1, t / 0.12, (1 - t) / 0.25);
  if (KINDS[p.kind].twinkle) return fade * (0.45 + 0.55 * Math.abs(Math.sin(p.phase * 2.2)));
  if (p.kind === "steam") return fade * 0.35;
  if (p.kind === "puff") return fade * 0.55;
  return fade * 0.9;
}

export function draw(ctx, p) {
  const s = p.size;
  ctx.fillStyle = p.color;
  ctx.strokeStyle = p.color;
  const spec = KINDS[p.kind];
  // Leaves, petals and feathers turn over as they fall.
  if (spec.flutter) ctx.scale(Math.cos(p.phase * 1.3) * 0.7 + 0.3, 1);

  switch (p.kind) {
    case "leaf": {
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.9, -s * 0.6, s * 0.7, s * 0.5, 0, s);
      ctx.bezierCurveTo(-s * 0.7, s * 0.5, -s * 0.9, -s * 0.6, 0, -s);
      ctx.fill();
      ctx.globalAlpha *= 0.5;
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.8);
      ctx.lineTo(0, s * 1.25);
      ctx.stroke();
      break;
    }
    case "petal": {
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.bezierCurveTo(s * 1.2, s * 0.2, s * 0.6, -s, 0, -s * 0.7);
      ctx.bezierCurveTo(-s * 0.6, -s, -s * 1.2, s * 0.2, 0, s);
      ctx.fill();
      break;
    }
    case "snow": {
      ctx.lineWidth = Math.max(1, s * 0.22);
      ctx.lineCap = "round";
      for (let i = 0; i < 6; i += 1) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -s);
        ctx.moveTo(0, -s * 0.55);
        ctx.lineTo(s * 0.3, -s * 0.8);
        ctx.moveTo(0, -s * 0.55);
        ctx.lineTo(-s * 0.3, -s * 0.8);
        ctx.stroke();
      }
      break;
    }
    case "marigold": {
      for (let i = 0; i < 8; i += 1) {
        ctx.rotate(TAU / 8);
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.55, s * 0.32, s * 0.55, 0, 0, TAU);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(160, 70, 10, 0.55)";
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.3, 0, TAU);
      ctx.fill();
      break;
    }
    case "mughalStar": {
      // Two squares, one turned 45°: the eight-point star of Mughal tilework.
      ctx.beginPath();
      ctx.rect(-s * 0.7, -s * 0.7, s * 1.4, s * 1.4);
      ctx.fill();
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.rect(-s * 0.7, -s * 0.7, s * 1.4, s * 1.4);
      ctx.fill();
      break;
    }
    case "blossom": {
      for (let i = 0; i < 5; i += 1) {
        ctx.rotate(TAU / 5);
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.6, s * 0.42, s * 0.6, 0, 0, TAU);
        ctx.fill();
      }
      ctx.fillStyle = "#e3a73f";
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.25, 0, TAU);
      ctx.fill();
      break;
    }
    case "feather": {
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.bezierCurveTo(s * 0.6, s * 0.2, s * 0.5, -s * 0.6, 0, -s);
      ctx.bezierCurveTo(-s * 0.5, -s * 0.6, -s * 0.6, s * 0.2, 0, s);
      ctx.fill();
      ctx.strokeStyle = "rgba(120, 105, 160, 0.45)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, s * 1.3);
      ctx.quadraticCurveTo(s * 0.1, 0, 0, -s * 0.9);
      ctx.stroke();
      break;
    }
    case "pearl": {
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = "rgba(140, 120, 190, 0.5)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.arc(-s * 0.35, -s * 0.35, s * 0.3, 0, TAU);
      ctx.fill();
      break;
    }
    case "bubble": {
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, TAU);
      ctx.stroke();
      ctx.globalAlpha *= 0.25;
      ctx.fill();
      ctx.globalAlpha /= 0.25;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.arc(-s * 0.4, -s * 0.4, s * 0.22, 0, TAU);
      ctx.fill();
      break;
    }
    case "firefly": {
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 4);
      glow.addColorStop(0, p.color);
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, s * 4, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#fffbe0";
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.6, 0, TAU);
      ctx.fill();
      break;
    }
    case "steam": {
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.bezierCurveTo(s * 0.5, s * 0.4, -s * 0.5, -s * 0.2, 0, -s);
      ctx.stroke();
      break;
    }
    case "heart": {
      ctx.beginPath();
      ctx.moveTo(0, s * 0.9);
      ctx.bezierCurveTo(-s * 1.4, 0, -s * 0.6, -s * 1.1, 0, -s * 0.35);
      ctx.bezierCurveTo(s * 0.6, -s * 1.1, s * 1.4, 0, 0, s * 0.9);
      ctx.fill();
      break;
    }
    case "puff": {
      const soft = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
      soft.addColorStop(0, p.color);
      soft.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = soft;
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, TAU);
      ctx.fill();
      break;
    }
    default: {
      // sparkle and star: a soft four-point twinkle.
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.6);
      ctx.quadraticCurveTo(0, 0, s * 1.6, 0);
      ctx.quadraticCurveTo(0, 0, 0, s * 1.6);
      ctx.quadraticCurveTo(0, 0, -s * 1.6, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s * 1.6);
      ctx.fill();
    }
  }
}

export { rand };
