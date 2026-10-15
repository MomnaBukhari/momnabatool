// The shapes the particles form. Each function returns `count` points
// (a Float32Array of x, y, z) that fit roughly inside a sphere of radius 1.
//
// To add a shape: write a function here, add it to SHAPES at the bottom, then
// use its name as a section's `shape` in src/data/profile.js.

const TAU = Math.PI * 2;

// Seeded random numbers, so every shape looks the same on every visit.
function random(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rand) {
  return Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(TAU * rand());
}

// Builds a shape from weighted parts: [[weight, (rand) => [x, y, z]], ...]
function compose(count, seed, parts) {
  const rand = random(seed);
  const total = parts.reduce((sum, [weight]) => sum + weight, 0);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    let pick = rand() * total;
    let part = parts[0][1];
    for (const [weight, fn] of parts) {
      pick -= weight;
      if (pick <= 0) {
        part = fn;
        break;
      }
    }
    const [x, y, z] = part(rand);
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

function rotate([x, y, z], rx = 0, ry = 0, rz = 0) {
  let cy = Math.cos(rx), sy = Math.sin(rx);
  [y, z] = [y * cy - z * sy, y * sy + z * cy];
  cy = Math.cos(ry);
  sy = Math.sin(ry);
  [x, z] = [x * cy + z * sy, -x * sy + z * cy];
  cy = Math.cos(rz);
  sy = Math.sin(rz);
  [x, y] = [x * cy - y * sy, x * sy + y * cy];
  return [x, y, z];
}

const jitter = (rand, amount) => (rand() - 0.5) * amount;

// Applies fn([x, y, z]) => [x, y, z] to every point.
function mapPoints(points, fn) {
  for (let i = 0; i < points.length; i += 3) {
    const [x, y, z] = fn([points[i], points[i + 1], points[i + 2]]);
    points[i] = x;
    points[i + 1] = y;
    points[i + 2] = z;
  }
  return points;
}

// ---------------------------------------------------------------------------

/** A mehndi-style mandala: rings of petals, dotted circles and a scalloped edge. */
function mandala(count) {
  const petalRing = (rand, petals, inner, outer, fullness) => {
    const k = Math.floor(rand() * petals);
    const t = rand();
    const side = rand() < 0.5 ? -1 : 1;
    const half = (Math.PI / petals) * fullness * Math.sin(Math.PI * t) ** 0.9;
    const angle = (k / petals) * TAU + side * half;
    const r = inner + (outer - inner) * t;
    return [Math.cos(angle) * r, Math.sin(angle) * r, 0];
  };
  const dome = ([x, y]) => [x, y, 0.18 * (1 - (x * x + y * y)) + 0.0];

  return compose(count, 11, [
    [4, (rand) => dome([gauss(rand) * 0.05, gauss(rand) * 0.05])],
    [9, (rand) => dome(petalRing(rand, 8, 0.08, 0.36, 0.9))],
    [6, (rand) => {
      const a = rand() * TAU;
      const r = 0.4 + jitter(rand, 0.012);
      return dome([Math.cos(a) * r, Math.sin(a) * r]);
    }],
    [14, (rand) => dome(petalRing(rand, 12, 0.42, 0.7, 0.85))],
    [8, (rand) => {
      // a ring of dots
      const k = Math.floor(rand() * 36);
      const a = (k / 36) * TAU;
      return dome([Math.cos(a) * 0.74 + gauss(rand) * 0.008, Math.sin(a) * 0.74 + gauss(rand) * 0.008]);
    }],
    [18, (rand) => dome(petalRing(rand, 18, 0.76, 0.98, 0.8))],
    [10, (rand) => {
      // scalloped outer edge
      const k = Math.floor(rand() * 24);
      const t = rand() * Math.PI;
      const centre = (k / 24) * TAU;
      const r = 1.02 + Math.sin(t) * 0.07;
      const a = centre + Math.cos(t) * (Math.PI / 24);
      return dome([Math.cos(a) * r, Math.sin(a) * r]);
    }],
    [5, (rand) => {
      const a = rand() * TAU;
      const r = 0.55 + rand() * 0.2;
      return dome([Math.cos(a) * r * 0.2, Math.sin(a) * r * 0.2]);
    }],
  ]);
}

/** A lotus opening: three tiers of curved petals around a centre. */
function lotus(count) {
  const tiers = [
    { petals: 6, length: 0.55, tilt: 1.15, width: 0.3, offset: 0 },
    { petals: 8, length: 0.8, tilt: 0.75, width: 0.32, offset: 0.2 },
    { petals: 10, length: 1.0, tilt: 0.35, width: 0.3, offset: 0.1 },
  ];
  const petal = (rand, tier) => {
    const k = Math.floor(rand() * tier.petals);
    const u = rand();
    const edge = rand() < 0.55;
    const v = edge ? (rand() < 0.5 ? -1 : 1) : rand() * 2 - 1;
    const width = Math.sin(Math.PI * u) ** 0.8 * tier.width;
    let p = [u * tier.length, u * u * 0.25, v * width];
    p = rotate(p, 0, 0, tier.tilt);
    p = rotate(p, 0, (k / tier.petals) * TAU + tier.offset, 0);
    return [p[0], p[1] - 0.25, p[2]];
  };
  const points = compose(count, 23, [
    [5, (rand) => [gauss(rand) * 0.08, -0.2 + Math.abs(gauss(rand)) * 0.12, gauss(rand) * 0.08]],
    [22, (rand) => petal(rand, tiers[0])],
    [32, (rand) => petal(rand, tiers[1])],
    [41, (rand) => petal(rand, tiers[2])],
  ]);
  // Tip it towards the viewer so you see into the flower.
  return mapPoints(points, (p) => rotate([p[0], p[1] * 1.1, p[2]], 0.45, 0, 0));
}

/** A double helix with rungs: a timeline that twists. */
function helix(count) {
  const turns = 2.6;
  const radius = 0.42;
  const strand = (rand, phase) => {
    const t = rand();
    const a = t * turns * TAU + phase;
    return [Math.cos(a) * radius + jitter(rand, 0.03), t * 2.2 - 1.1, Math.sin(a) * radius + jitter(rand, 0.03)];
  };
  const points = compose(count, 37, [
    [36, (rand) => strand(rand, 0)],
    [36, (rand) => strand(rand, Math.PI)],
    [22, (rand) => {
      const k = Math.floor(rand() * 26);
      const t = (k + 0.5) / 26;
      const a = t * turns * TAU;
      const s = rand() * 2 - 1;
      return [Math.cos(a) * radius * s, t * 2.2 - 1.1, Math.sin(a) * radius * s];
    }],
    [6, (rand) => [gauss(rand) * 0.22, rand() * 2.4 - 1.2, gauss(rand) * 0.22]],
  ]);
  // Lean it slightly so it reads in 3D.
  return mapPoints(points, (p) => rotate(p, 0, 0, -0.35));
}

/** A spiral galaxy, seen at an angle. */
function galaxy(count) {
  return compose(count, 41, [
    [18, (rand) => rotate([gauss(rand) * 0.12, gauss(rand) * 0.05, gauss(rand) * 0.12], 1.05, 0, 0)],
    [82, (rand) => {
      const arm = Math.floor(rand() * 3);
      const r = rand() ** 0.75 * 1.15;
      const a = r * 4.2 + (arm / 3) * TAU + gauss(rand) * 0.22 * (1.1 - r);
      const y = gauss(rand) * 0.04 * (1.2 - r);
      return rotate([Math.cos(a) * r, y, Math.sin(a) * r], 1.05, 0, 0);
    }],
  ]);
}

/** Six stacked layers, the shape of a backend: client to database. */
function stack(count) {
  const layers = 6;
  const w = 1.25;
  const d = 0.85;
  const layer = (rand) => {
    const k = Math.floor(rand() * layers);
    const y = 0.75 - (k / (layers - 1)) * 1.5;
    let x;
    let z;
    if (rand() < 0.62) {
      // outline
      const t = rand() * 2 * (w + d);
      if (t < w) [x, z] = [t - w / 2, -d / 2];
      else if (t < w + d) [x, z] = [w / 2, t - w - d / 2];
      else if (t < 2 * w + d) [x, z] = [w / 2 - (t - w - d), d / 2];
      else [x, z] = [-w / 2, d / 2 - (t - 2 * w - d)];
    } else {
      // a few grid lines across the surface
      const line = Math.floor(rand() * 4);
      x = -w / 2 + ((line + 1) / 5) * w;
      z = (rand() - 0.5) * d;
      if (rand() < 0.5) [x, z] = [(rand() - 0.5) * w, -d / 2 + ((line + 1) / 5) * d];
    }
    return rotate([x, y, z], 0.5, Math.PI / 4, 0);
  };
  return compose(count, 53, [
    [92, layer],
    [8, (rand) => rotate([jitter(rand, 0.04), rand() * 1.5 - 0.75, jitter(rand, 0.04)], 0.5, Math.PI / 4, 0)],
  ]);
}

/** A globe of latitude and longitude lines with an orbit: many languages, one world. */
function globe(count) {
  const r = 0.82;
  return compose(count, 61, [
    [28, (rand) => {
      const lat = ((Math.floor(rand() * 9) + 1) / 10) * Math.PI - Math.PI / 2;
      const a = rand() * TAU;
      return [Math.cos(lat) * Math.cos(a) * r, Math.sin(lat) * r, Math.cos(lat) * Math.sin(a) * r];
    }],
    [28, (rand) => {
      const lon = (Math.floor(rand() * 12) / 12) * Math.PI;
      const a = rand() * TAU;
      return [Math.cos(a) * Math.cos(lon) * r, Math.sin(a) * r, Math.cos(a) * Math.sin(lon) * r];
    }],
    [26, (rand) => {
      const u = rand() * 2 - 1;
      const a = rand() * TAU;
      const s = Math.sqrt(1 - u * u);
      return [s * Math.cos(a) * r, u * r, s * Math.sin(a) * r];
    }],
    [18, (rand) => {
      const a = rand() * TAU;
      return rotate([Math.cos(a) * 1.18, jitter(rand, 0.02), Math.sin(a) * 1.18], 1.25, 0, 0.35);
    }],
  ]);
}

/** A constellation: stars joined by faint lines. */
function constellation(count) {
  const rand = random(71);
  const nodes = Array.from({ length: 30 }, () => [
    (rand() * 2 - 1) * 1.05,
    (rand() * 2 - 1) * 0.85,
    (rand() * 2 - 1) * 0.5,
  ]);
  const edges = [];
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => [j, Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])])
      .filter(([j]) => j !== i)
      .sort((p, q) => p[1] - q[1])
      .slice(0, 2)
      .forEach(([j]) => i < j && edges.push([i, j]));
  });
  return compose(count, 73, [
    [40, (r) => {
      const n = nodes[Math.floor(r() * nodes.length)];
      return [n[0] + gauss(r) * 0.025, n[1] + gauss(r) * 0.025, n[2] + gauss(r) * 0.025];
    }],
    [48, (r) => {
      const [i, j] = edges[Math.floor(r() * edges.length)];
      const t = r();
      const a = nodes[i];
      const b = nodes[j];
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }],
    [12, (r) => [(r() * 2 - 1) * 1.3, (r() * 2 - 1) * 1, (r() * 2 - 1) * 0.6]],
  ]);
}

/** A soft 3D heart. */
function heart(count) {
  const point = (t) => [
    (16 * Math.sin(t) ** 3) / 17,
    (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17 + 0.1,
  ];
  return compose(count, 83, [
    [45, (rand) => {
      const [x, y] = point(rand() * TAU);
      return [x + jitter(rand, 0.02), y + jitter(rand, 0.02), jitter(rand, 0.12)];
    }],
    [55, (rand) => {
      const s = Math.sqrt(rand());
      const [x, y] = point(rand() * TAU);
      const depth = Math.sqrt(1 - s * s) * 0.32;
      return [x * s, y * s + 0.05 * (1 - s), (rand() * 2 - 1) * depth];
    }],
  ]);
}

/** A paper plane with a dotted trail: send me a message. */
function plane(count) {
  const nose = [1, 0.05, 0];
  const tailL = [-0.75, 0.12, 0.72];
  const tailR = [-0.75, 0.12, -0.72];
  const tailC = [-0.62, 0, 0];
  const keel = [-0.7, -0.38, 0];
  const tri = (rand, a, b, c) => {
    let u = rand();
    let v = rand();
    if (u + v > 1) [u, v] = [1 - u, 1 - v];
    return a.map((value, i) => value + (b[i] - value) * u + (c[i] - value) * v);
  };
  const edge = (rand, a, b) => {
    const t = rand();
    return a.map((value, i) => value + (b[i] - value) * t);
  };
  // Angle it so it is flying up and away, and shift it so the trail fits.
  const place = (p) => {
    const [x, y, z] = rotate(p, 0.15, -0.6, 0.28);
    return [x * 0.82 + 0.45, y * 0.82 + 0.15, z * 0.82];
  };
  return compose(count, 97, [
    [20, (rand) => place(tri(rand, nose, tailL, tailC))],
    [20, (rand) => place(tri(rand, nose, tailR, tailC))],
    [14, (rand) => place(tri(rand, nose, tailC, keel))],
    [8, (rand) => place(edge(rand, nose, tailL))],
    [8, (rand) => place(edge(rand, nose, tailR))],
    [6, (rand) => place(edge(rand, nose, keel))],
    [24, (rand) => {
      // a looping dotted trail behind the plane
      const k = Math.floor(rand() * 60);
      const t = k / 60;
      const x = -0.75 - t * 0.9;
      const y = -0.2 - Math.sin(t * Math.PI * 1.6) * 0.35 - t * 0.2;
      return [x + jitter(rand, 0.015), y + jitter(rand, 0.015), Math.cos(t * 5) * 0.2];
    }],
  ]);
}

/** Loose, glittery confetti for The Nook. */
function sparkles(count) {
  return compose(count, 107, [
    [70, (rand) => {
      const u = rand() * 2 - 1;
      const a = rand() * TAU;
      const r = 0.4 + rand() ** 0.5 * 0.8;
      const s = Math.sqrt(1 - u * u);
      return [s * Math.cos(a) * r * 1.3, u * r, s * Math.sin(a) * r];
    }],
    [30, (rand) => {
      const k = Math.floor(rand() * 12);
      const cx = Math.cos(k * 2.4) * 0.8;
      const cy = Math.sin(k * 1.7) * 0.6;
      return [cx + gauss(rand) * 0.06, cy + gauss(rand) * 0.06, gauss(rand) * 0.1];
    }],
  ]);
}

/** Particles scattered wide: where everything starts. */
function scatter(count) {
  return compose(count, 3, [[1, (rand) => [(rand() * 2 - 1) * 3.2, (rand() * 2 - 1) * 2, (rand() * 2 - 1) * 1.5]]]);
}

export const SHAPES = {
  mandala,
  lotus,
  helix,
  galaxy,
  stack,
  globe,
  constellation,
  heart,
  plane,
  sparkles,
  scatter,
};

/** How each shape turns: around its own centre (z, like a wheel) or around the vertical (y). */
export const SPIN = {
  mandala: { axis: "z", speed: 0.05 },
  lotus: { axis: "y", speed: 0.12 },
  helix: { axis: "y", speed: 0.25 },
  galaxy: { axis: "y", speed: 0.06 },
  stack: { axis: "y", speed: 0.08 },
  globe: { axis: "y", speed: 0.18 },
  constellation: { axis: "y", speed: 0.05 },
  heart: { axis: "y", speed: 0.3 },
  plane: { axis: "y", speed: 0.06 },
  sparkles: { axis: "y", speed: 0.08 },
  scatter: { axis: "y", speed: 0.02 },
};
