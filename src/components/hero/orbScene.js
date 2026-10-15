// The liquid-glass orb in the hero.
//
// One sphere, gently reshaped by noise so it moves like liquid, shaded to look
// like polished glass with an iridescent film in the current theme's colours.
// It leans and bulges towards the pointer, and the hero's scroll animation
// drives `params.scroll`.
//
// Plain Three.js, no React. LiquidOrb.jsx creates it.

import {
  IcosahedronGeometry,
  MathUtils,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

// 3D simplex noise (Ashima Arts / Stefan Gustavson, MIT licence).
const noise = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWobble;
  uniform vec3 uPointer;

  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;

  ${noise}

  float shape(vec3 p) {
    float slow = snoise(p * 0.7 + vec3(0.0, uTime * 0.14, uTime * 0.07));
    float fine = snoise(p * 1.6 - vec3(uTime * 0.18));
    // The surface swells a little towards the pointer.
    float lean = max(dot(normalize(p), uPointer), 0.0);
    return slow * 0.085 * uWobble + fine * 0.018 + lean * lean * 0.07;
  }

  vec3 displaced(vec3 p) {
    return p + normalize(p) * shape(p);
  }

  void main() {
    vec3 p = position;
    vec3 n = normalize(normal);

    // Work out the bent surface's normal from two nearby points.
    vec3 helper = abs(n.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
    vec3 tangent = normalize(cross(n, helper));
    vec3 bitangent = normalize(cross(n, tangent));
    float e = 0.01;
    vec3 a = displaced(p);
    vec3 b = displaced(p + tangent * e);
    vec3 c = displaced(p + bitangent * e);
    vec3 bentNormal = normalize(cross(b - a, c - a));
    if (dot(bentNormal, n) < 0.0) bentNormal = -bentNormal;

    vNoise = shape(p);
    vec4 world = modelMatrix * vec4(a, 1.0);
    vNormal = normalize(mat3(modelMatrix) * bentNormal);
    vView = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float facing = max(dot(n, v), 0.0);
    float fresnel = pow(1.0 - facing, 2.4);

    // An iridescent film: the colour shifts with the angle and the ripples.
    float band = 0.5 + 0.5 * sin(dot(n, vec3(0.55, 0.75, 0.35)) * 3.2 + vNoise * 7.0 + uTime * 0.35);
    vec3 film = mix(uColor1, uColor2, smoothstep(0.0, 0.65, band));
    film = mix(film, uColor3, smoothstep(0.55, 1.0, band) * 0.7);

    // Pearly white at the centre, richer colour towards the edges.
    vec3 colour = mix(vec3(0.99, 0.985, 1.0), film, 0.5 + 0.5 * fresnel);

    // Soft studio lighting.
    vec3 key = normalize(vec3(-0.55, 0.85, 0.65));
    vec3 fill = normalize(vec3(0.7, -0.35, 0.6));
    colour *= 0.86 + 0.2 * max(dot(n, key), 0.0);
    float shine = pow(max(dot(n, normalize(key + v)), 0.0), 90.0);
    float sheen = pow(max(dot(n, normalize(fill + v)), 0.0), 18.0);
    // A crisp window reflection near the top, the mark of polished glass.
    float window = smoothstep(0.9, 0.94, dot(n, normalize(vec3(-0.35, 0.7, 0.62)))) * 0.38;
    colour += shine * 0.9 + sheen * film * 0.4 + window;

    // A glowing rim, like light caught in the edge of glass.
    colour += film * fresnel * 0.45;

    gl_FragColor = vec4(min(colour, vec3(1.0)), 1.0);
  }
`;

const hexToVector = (hex) => {
  const value = parseInt(hex.replace("#", "").slice(0, 6), 16);
  return new Vector3(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
};

export function createOrb({ canvas, container, colors, reducedMotion }) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  // The orb fills about 40% of the canvas, leaving room to grow while scrolling.
  camera.position.set(0, 0, 10.3);

  const detail = window.innerWidth < 700 ? 40 : 72;
  const geometry = new IcosahedronGeometry(1.1, detail);
  const uniforms = {
    uTime: { value: 0 },
    uWobble: { value: 1 },
    uPointer: { value: new Vector3(0, 0, 0) },
    uColor1: { value: hexToVector(colors.orb[0]) },
    uColor2: { value: hexToVector(colors.orb[1]) },
    uColor3: { value: hexToVector(colors.orb[2]) },
  };
  const material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms });
  const orb = new Mesh(geometry, material);
  scene.add(orb);

  // Animated from outside: the hero's scroll timeline sets these.
  const params = { scroll: 0, intro: reducedMotion ? 1 : 0 };
  const pointer = new Vector2(0, 0);
  const pointerEased = new Vector2(0, 0);
  const pointerDir = new Vector3();
  let width = 1;
  let height = 1;
  let running = false;
  let visible = true;
  let frame = 0;
  let last = null;

  function resize() {
    width = Math.max(container.clientWidth, 1);
    height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  }

  function update(delta) {
    uniforms.uTime.value += delta;
    pointerEased.lerp(pointer, 1 - Math.exp(-delta * 3));

    // Lean towards the pointer.
    pointerDir.set(pointerEased.x, pointerEased.y, 0.6).normalize();
    uniforms.uPointer.value.copy(pointerDir).multiplyScalar(Math.min(1, pointerEased.length() * 1.4));

    const intro = MathUtils.clamp(params.intro, 0, 1);
    const scale = (0.55 + 0.45 * easeOut(intro)) * (1 + params.scroll * 0.55);
    orb.scale.setScalar(scale);
    orb.rotation.y += delta * (0.12 + params.scroll * 0.6);
    orb.rotation.x = pointerEased.y * -0.3 + params.scroll * 0.4;
    orb.rotation.z = pointerEased.x * -0.15;
    uniforms.uWobble.value = 1 + params.scroll * 0.6;
  }

  function render() {
    renderer.render(scene, camera);
  }

  function tick(now) {
    frame = requestAnimationFrame(tick);
    const delta = last === null ? 0 : MathUtils.clamp((now - last) / 1000, 0, 0.05);
    last = now;
    update(delta);
    render();
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

  const sync = () => setRunning(visible && !document.hidden && !reducedMotion);

  const onPointerMove = (event) => {
    if (event.pointerType === "touch") return;
    const rect = container.getBoundingClientRect();
    pointer.set(
      MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1.5, 1.5),
      MathUtils.clamp(-(((event.clientY - rect.top) / rect.height) * 2 - 1), -1.5, 1.5)
    );
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  visibility.observe(container);
  document.addEventListener("visibilitychange", sync);
  if (!reducedMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });

  resize();
  if (reducedMotion) {
    uniforms.uTime.value = 4;
    update(0);
    render();
  } else {
    sync();
  }

  return {
    params,
    setColors(next) {
      uniforms.uColor1.value.copy(hexToVector(next.orb[0]));
      uniforms.uColor2.value.copy(hexToVector(next.orb[1]));
      uniforms.uColor3.value.copy(hexToVector(next.orb[2]));
      if (!running) render();
    },
    dispose() {
      setRunning(false);
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}

function easeOut(t) {
  return 1 - (1 - t) ** 3;
}
