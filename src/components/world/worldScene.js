// The particle world: thousands of tiny points that float behind the whole
// site and flow from one shape into the next as you move through it.
//
// Plain Three.js, no React. ParticleWorld.jsx creates it and calls show().

import {
  BufferAttribute,
  BufferGeometry,
  Group,
  MathUtils,
  NormalBlending,
  PerspectiveCamera,
  Plane,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { SHAPES, SPIN } from "./shapes";

const FOV = 35;
const CAMERA_Z = 10;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uOpacity;
  uniform float uChaos;
  uniform vec3 uMouse;
  uniform float uMouseStrength;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uGlint;

  attribute vec4 aRandom;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vGlint;

  void main() {
    vec3 p = position;

    // A slow, breathing drift, much stronger while a shape is changing.
    float t = uTime * 0.55 + aRandom.y * 6.2831;
    float amount = 0.014 + uChaos * (0.18 + 0.5 * aRandom.z);
    p += vec3(sin(t + p.y * 2.3), cos(t * 0.9 + p.x * 2.1), sin(t * 1.15 + p.z * 1.9)) * amount;

    vec4 world = modelMatrix * vec4(p, 1.0);

    // Particles part around the pointer like dust.
    vec2 away = world.xy - uMouse.xy;
    float dist = length(away);
    float push = smoothstep(1.25, 0.0, dist) * uMouseStrength;
    world.xy += normalize(away + 0.0001) * push * 0.5;
    world.z += push * 0.35;

    vec4 view = viewMatrix * world;
    gl_Position = projectionMatrix * view;

    float glint = step(0.955, aRandom.x);
    float twinkle = 0.55 + 0.45 * sin(uTime * (1.8 + aRandom.w * 3.0) + aRandom.y * 40.0);
    float size = uSize * (0.5 + aRandom.w * 1.05);
    size *= mix(1.0, 2.6 * twinkle, glint);
    gl_PointSize = size * uPixelRatio * (${CAMERA_Z.toFixed(1)} / -view.z);

    vColor = aRandom.x < 0.5 ? uColor1 : (aRandom.x < 0.78 ? uColor2 : (aRandom.x < 0.955 ? uColor3 : uGlint));
    vAlpha = uOpacity * mix(0.5 + 0.5 * aRandom.z, twinkle, glint);
    vGlint = glint;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vGlint;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    float alpha;
    if (vGlint > 0.5) {
      // a four-pointed star
      float rays = max(0.0, 1.0 - abs(uv.x * uv.y) * 120.0) * smoothstep(0.5, 0.05, r);
      alpha = max(rays, smoothstep(0.16, 0.0, r));
    } else {
      alpha = smoothstep(0.5, 0.28, r);
    }
    if (alpha < 0.02) discard;
    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

const hexToVector = (hex) => {
  const value = parseInt(hex.replace("#", "").slice(0, 6), 16);
  return new Vector3(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
};

/**
 * Where a shape sits on screen.
 *   x, y    centre, as a fraction of the screen from the middle (-0.5 to 0.5)
 *   size    radius, as a fraction of the screen's shorter side
 *   opacity how strongly it shows
 */
export const PLACEMENTS = {
  desktop: {
    hero: { x: 0.25, y: -0.02, size: 0.34, opacity: 1 },
    // Below the section heading, in the left-hand column.
    left: { x: -0.285, y: -0.14, size: 0.235, opacity: 0.95 },
    right: { x: 0.26, y: 0, size: 0.3, opacity: 0.9 },
    center: { x: 0, y: 0, size: 0.42, opacity: 0.45 },
  },
  mobile: {
    hero: { x: 0, y: 0.2, size: 0.44, opacity: 0.55 },
    left: { x: 0.2, y: 0.25, size: 0.3, opacity: 0.35 },
    right: { x: 0.2, y: 0.25, size: 0.3, opacity: 0.35 },
    center: { x: 0, y: 0.1, size: 0.45, opacity: 0.3 },
  },
};

export function createWorld({ canvas, count, reducedMotion, colors }) {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(pixelRatio);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.set(0, 0, CAMERA_Z);

  // ---------- particles ----------
  const positions = SHAPES.scatter(count);
  const targets = new Float32Array(positions);
  const speeds = new Float32Array(count);
  const randoms = new Float32Array(count * 4);
  for (let i = 0; i < count; i += 1) {
    speeds[i] = 1.1 + Math.random() * 2.2;
    randoms[i * 4] = Math.random();
    randoms[i * 4 + 1] = Math.random();
    randoms[i * 4 + 2] = Math.random();
    randoms[i * 4 + 3] = Math.random();
  }

  const geometry = new BufferGeometry();
  const positionAttribute = new BufferAttribute(positions, 3);
  geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute("aRandom", new BufferAttribute(randoms, 4));

  const uniforms = {
    uTime: { value: 0 },
    uSize: { value: 3.1 },
    uPixelRatio: { value: pixelRatio },
    uOpacity: { value: 0 },
    uChaos: { value: 0 },
    uMouse: { value: new Vector3(99, 99, 0) },
    uMouseStrength: { value: 0 },
    uColor1: { value: hexToVector(colors.particles[0]) },
    uColor2: { value: hexToVector(colors.particles[1]) },
    uColor3: { value: hexToVector(colors.particles[2]) },
    uGlint: { value: hexToVector(colors.glint) },
  };

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    // Normal blending: additive glow would wash out on these light themes.
    blending: NormalBlending,
  });

  const points = new Points(geometry, material);
  points.frustumCulled = false;
  const placement = new Group(); // where on screen, and how big
  const spinner = new Group(); // the shape's own slow rotation
  spinner.add(points);
  placement.add(spinner);
  scene.add(placement);

  // ---------- state ----------
  const shapeCache = new Map();
  let shapeName = "scatter";
  let layoutName = "center";
  const layout = { x: 0, y: 0, size: 0.4, opacity: 0 };
  const layoutTarget = { ...layout };
  const spinAngle = { y: 0, z: 0 };
  const pointer = new Vector2(0, 0);
  const pointerEased = new Vector2(0, 0);
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const hit = new Vector3();
  let mouseActive = false;
  let width = 1;
  let height = 1;
  let unitsPerPixel = 0.01;
  let running = false;
  let frame = 0;
  let last = null;
  let chaosTimer = 0;

  const isMobile = () => width < 900;

  function getShape(name) {
    if (!shapeCache.has(name)) shapeCache.set(name, (SHAPES[name] || SHAPES.sparkles)(count));
    return shapeCache.get(name);
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const visibleHeight = 2 * CAMERA_Z * Math.tan(MathUtils.degToRad(FOV / 2));
    unitsPerPixel = visibleHeight / height;
    applyLayoutTarget();
    if (reducedMotion) renderOnce();
  }

  function applyLayoutTarget() {
    const preset = PLACEMENTS[isMobile() ? "mobile" : "desktop"][layoutName] || PLACEMENTS.desktop.center;
    Object.assign(layoutTarget, preset);
  }

  // ---------- frame loop ----------
  function update(delta) {
    uniforms.uTime.value += delta;

    // Move every particle a little closer to where it belongs. Each one has its
    // own speed, which is what makes the change look like a flock, not a fade.
    const target = targets;
    for (let i = 0; i < count; i += 1) {
      const k = 1 - Math.exp(-delta * speeds[i]);
      const j = i * 3;
      positions[j] += (target[j] - positions[j]) * k;
      positions[j + 1] += (target[j + 1] - positions[j + 1]) * k;
      positions[j + 2] += (target[j + 2] - positions[j + 2]) * k;
    }
    positionAttribute.needsUpdate = true;

    // Ease the shape towards its place on screen.
    const ease = 1 - Math.exp(-delta * 2.4);
    layout.x += (layoutTarget.x - layout.x) * ease;
    layout.y += (layoutTarget.y - layout.y) * ease;
    layout.size += (layoutTarget.size - layout.size) * ease;
    layout.opacity += (layoutTarget.opacity - layout.opacity) * ease;

    const radiusUnits = layout.size * Math.min(width, height) * unitsPerPixel;
    placement.position.set(layout.x * width * unitsPerPixel, layout.y * height * unitsPerPixel, 0);
    placement.scale.setScalar(radiusUnits);
    uniforms.uOpacity.value = layout.opacity;

    // Each shape turns in its own way; flat ones turn to face you.
    const spin = SPIN[shapeName] || SPIN.sparkles;
    if (spin.axis === "z") {
      spinAngle.z += delta * spin.speed;
      spinAngle.y += (0 - wrap(spinAngle.y)) * ease;
    } else {
      spinAngle.y += delta * spin.speed;
      spinAngle.z += (0 - wrap(spinAngle.z)) * ease;
    }
    pointerEased.lerp(pointer, 1 - Math.exp(-delta * 3));
    spinner.rotation.set(pointerEased.y * 0.25, spinAngle.y + pointerEased.x * 0.35, spinAngle.z);

    // Pointer repulsion fades in and out.
    const strength = mouseActive ? 1 : 0;
    uniforms.uMouseStrength.value += (strength - uniforms.uMouseStrength.value) * (1 - Math.exp(-delta * 5));

    // The swirl that plays during a change settles back down.
    chaosTimer = Math.max(0, chaosTimer - delta);
    const chaosTarget = chaosTimer > 0 ? 1 : 0;
    uniforms.uChaos.value += (chaosTarget - uniforms.uChaos.value) * (1 - Math.exp(-delta * (chaosTarget ? 6 : 1.6)));
  }

  function wrap(angle) {
    return Math.atan2(Math.sin(angle), Math.cos(angle));
  }

  function renderOnce() {
    renderer.render(scene, camera);
  }

  function tick(now) {
    frame = requestAnimationFrame(tick);
    const delta = last === null ? 0 : MathUtils.clamp((now - last) / 1000, 0, 0.05);
    last = now;
    update(delta);
    renderOnce();
  }

  function setRunning(next) {
    if (next === running) return;
    running = next;
    cancelAnimationFrame(frame);
    if (running) {
      last = null;
      frame = requestAnimationFrame(tick);
    }
  }

  // With reduced motion: jump straight to the shape and draw a single still frame.
  function settle() {
    targets.set(getShape(shapeName));
    positions.set(targets);
    positionAttribute.needsUpdate = true;
    applyLayoutTarget();
    Object.assign(layout, layoutTarget);
    update(0);
    uniforms.uChaos.value = 0;
    renderOnce();
  }

  // ---------- events ----------
  function onPointerMove(event) {
    if (event.pointerType === "touch") return;
    pointer.set((event.clientX / width) * 2 - 1, -(event.clientY / height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(plane, hit)) uniforms.uMouse.value.copy(hit);
    mouseActive = true;
  }
  const onPointerLeave = () => {
    mouseActive = false;
    pointer.set(0, 0);
  };
  const onVisibility = () => setRunning(!document.hidden && !reducedMotion);

  window.addEventListener("resize", resize);
  if (!reducedMotion) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
  }
  document.addEventListener("visibilitychange", onVisibility);

  resize();
  if (reducedMotion) settle();
  else setRunning(true);

  // ---------- what React uses ----------
  return {
    /** Flow into a shape (see shapes.js) at a placement (see PLACEMENTS). */
    show(name, where = "center") {
      const changed = name !== shapeName;
      shapeName = SHAPES[name] ? name : "sparkles";
      layoutName = where;
      applyLayoutTarget();
      if (changed) {
        targets.set(getShape(shapeName));
        chaosTimer = 0.35;
      }
      if (reducedMotion) settle();
    },

    /** Recolour the particles, e.g. after a theme change. */
    setColors(next) {
      const list = [...next.particles, next.glint];
      [uniforms.uColor1, uniforms.uColor2, uniforms.uColor3, uniforms.uGlint].forEach((uniform, i) => {
        const to = hexToVector(list[i]);
        uniform.value.copy(to);
      });
      if (reducedMotion) renderOnce();
    },

    /** A ripple from a point on screen, for clicks. */
    ripple(clientX, clientY) {
      if (reducedMotion) return;
      const ndc = new Vector2((clientX / width) * 2 - 1, -(clientY / height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) uniforms.uMouse.value.copy(hit);
      uniforms.uMouseStrength.value = 2.2;
    },

    dispose() {
      setRunning(false);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}

