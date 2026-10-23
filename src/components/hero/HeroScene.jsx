import { useTheme } from "../../theme/ThemeContext";
import "./HeroScene.css";

// A small seeded random generator, so stars and fireflies sit in the same
// places on every visit (and on the server-free first render).
function seeded(seed) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

const random = seeded(7);
const STARS = Array.from({ length: 90 }, () => ({
  x: random() * 100,
  y: random() * 85,
  size: 1 + random() * 2.2,
  delay: random() * 5,
  duration: 2.5 + random() * 4,
}));
const FIREFLIES = Array.from({ length: 16 }, () => ({
  x: 5 + random() * 90,
  y: 10 + random() * 75,
  delay: random() * 8,
  duration: 7 + random() * 8,
}));

// A Mughal arch: straight sides rising into a pointed, cusped top.
const ARCH =
  "M0 120 V52 C0 40 6 34 14 30 C20 27 24 20 30 10 C36 20 40 27 46 30 C54 34 60 40 60 52 V120 Z";

// A row of pine trees, built once as one path per layer.
function treeline(count, baseY, height, seed) {
  const r = seeded(seed);
  let d = `M0 ${baseY}`;
  const step = 1200 / count;
  for (let i = 0; i < count; i += 1) {
    const x = i * step;
    const h = height * (0.6 + r() * 0.5);
    d += ` L${x + step * 0.1} ${baseY} L${x + step * 0.5} ${baseY - h} L${x + step * 0.9} ${baseY}`;
  }
  return `${d} L1200 ${baseY} L1200 300 L0 300 Z`;
}
const TREES_BACK = treeline(26, 250, 120, 3);
const TREES_FRONT = treeline(18, 280, 150, 11);

const WAVE = (amp, y) =>
  `M0 ${y} C 150 ${y - amp} 350 ${y - amp} 500 ${y} S 850 ${y + amp} 1000 ${y} S 1350 ${y - amp} 1500 ${y} S 1850 ${y + amp} 2000 ${y} V 300 H 0 Z`;

/**
 * The picture behind the hero, different for every theme: clouds, velvet,
 * autumn hills, snowy mountains, Mughal arches, fireflies, blossoms, a pearl
 * lake, a starry silk sky, waves, a forest or a steaming cup.
 * Purely decorative and hidden from screen readers.
 */
export default function HeroScene() {
  const { theme } = useTheme();

  return (
    <div className={`scene scene--${theme}`} aria-hidden="true">
      {theme === "cloud" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <svg key={i} className={`scene__cloud scene__cloud--${i}`} viewBox="0 0 200 90">
              <path d="M30 80 C8 80 4 56 24 50 C22 30 48 22 60 36 C66 14 104 8 114 34 C130 22 160 30 156 52 C180 52 188 80 164 80 Z" />
            </svg>
          ))}
        </>
      )}

      {theme === "burgundy" && (
        <>
          <svg className="scene__drape scene__drape--left" viewBox="0 0 300 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="velvet" x1="0" x2="1">
                <stop offset="0" stopColor="var(--accent-ink)" />
                <stop offset="0.45" stopColor="var(--scene-3)" />
                <stop offset="0.7" stopColor="var(--accent)" />
                <stop offset="1" stopColor="var(--accent-ink)" />
              </linearGradient>
            </defs>
            <path d="M0 0 H300 C220 120 180 260 200 600 H0 Z" fill="url(#velvet)" />
          </svg>
          <svg className="scene__drape scene__drape--right" viewBox="0 0 300 600" preserveAspectRatio="none">
            <path d="M0 0 H300 C220 120 180 260 200 600 H0 Z" fill="url(#velvet)" />
          </svg>
          <div className="scene__vignette" />
        </>
      )}

      {theme === "autumn" && (
        <>
          <div className="scene__sun" />
          <svg className="scene__ground" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path d="M0 210 C 200 150 380 170 600 200 S 1000 160 1200 190 V300 H0 Z" fill="var(--scene-1)" opacity="0.55" />
            <path d="M0 250 C 260 210 480 240 700 250 S 1050 220 1200 240 V300 H0 Z" fill="var(--scene-3)" opacity="0.35" />
          </svg>
        </>
      )}

      {theme === "winter" && (
        <>
          <div className="scene__aurora" />
          <svg className="scene__ground" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path d="M0 260 L160 140 L260 210 L420 90 L560 220 L700 120 L860 230 L1000 110 L1200 240 V300 H0 Z" fill="var(--scene-3)" opacity="0.45" />
            <path d="M420 90 L470 135 L445 130 L420 150 L398 128 L375 134 Z M1000 110 L1050 150 L1025 148 L1000 165 L980 146 L955 148 Z M700 120 L740 155 L718 152 L700 168 L684 152 L662 156 Z" fill="#ffffff" opacity="0.9" />
            <path d="M0 280 C 300 250 600 270 900 260 S 1150 270 1200 265 V300 H0 Z" fill="#ffffff" opacity="0.8" />
          </svg>
        </>
      )}

      {theme === "heritage" && (
        <>
          <svg className="scene__jaali" width="100%" height="100%">
            <defs>
              <pattern id="jaali" width="56" height="56" patternUnits="userSpaceOnUse">
                <g fill="none" stroke="var(--accent)" strokeWidth="1">
                  <rect x="14" y="14" width="28" height="28" />
                  <rect x="14" y="14" width="28" height="28" transform="rotate(45 28 28)" />
                  <circle cx="28" cy="28" r="5" />
                  <path d="M0 0 L14 14 M56 0 L42 14 M0 56 L14 42 M56 56 L42 42" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#jaali)" />
          </svg>
          <svg className="scene__arches" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMax slice">
            {Array.from({ length: 20 }, (_, i) => (
              <g key={i} transform={`translate(${i * 60} 0)`}>
                <path d={ARCH} transform="translate(4 0) scale(0.866 1)" fill="var(--scene-1)" />
                <path d={ARCH} transform="translate(13 22) scale(0.566 0.82)" fill="var(--bg)" opacity="0.9" />
              </g>
            ))}
            <rect x="0" y="112" width="1200" height="8" fill="var(--scene-3)" opacity="0.6" />
          </svg>
        </>
      )}

      {theme === "fairy" && (
        <>
          <div className="scene__glow scene__glow--mint" />
          <div className="scene__glow scene__glow--lilac" />
          {FIREFLIES.map((f, i) => (
            <span
              key={i}
              className="scene__firefly"
              style={{ left: `${f.x}%`, top: `${f.y}%`, animationDelay: `${-f.delay}s`, animationDuration: `${f.duration}s` }}
            />
          ))}
        </>
      )}

      {theme === "vanilla" && (
        <>
          <div className="scene__rays" />
          <svg className="scene__branch" viewBox="0 0 400 220">
            <path d="M400 10 C 320 30 260 60 200 70 C 150 78 110 100 70 140" fill="none" stroke="#a9805a" strokeWidth="3" strokeLinecap="round" />
            <path d="M260 52 C 250 80 240 100 222 120 M150 82 C 140 60 128 48 110 40" fill="none" stroke="#a9805a" strokeWidth="2" strokeLinecap="round" />
            {[
              [330, 26], [290, 44], [240, 60], [222, 118], [180, 74], [120, 108], [110, 40], [82, 130], [356, 18],
            ].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(${i * 40})`}>
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse key={a} cx="0" cy="-6" rx="4.5" ry="6.5" transform={`rotate(${a})`} fill={i % 2 ? "#f8dfcd" : "#fff3e2"} stroke="#e8c1a3" strokeWidth="0.6" />
                ))}
                <circle r="2.4" fill="#e3a73f" />
              </g>
            ))}
          </svg>
        </>
      )}

      {theme === "swan" && (
        <>
          <div className="scene__pearl" />
          <svg className="scene__lake" viewBox="0 0 1200 200" preserveAspectRatio="none">
            {[0, 1, 2, 3].map((i) => (
              <ellipse key={i} className="scene__ripple" cx="840" cy="140" rx={60 + i * 70} ry={10 + i * 12} style={{ animationDelay: `${i * -1.6}s` }} />
            ))}
          </svg>
        </>
      )}

      {theme === "starlight" && (
        <>
          <div className="scene__moon" />
          {STARS.map((s, i) => (
            <span
              key={i}
              className="scene__star"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${-s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
          <svg className="scene__silk" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="silk" x1="0" x2="1">
                <stop offset="0" stopColor="var(--scene-1)" stopOpacity="0" />
                <stop offset="0.4" stopColor="var(--scene-2)" stopOpacity="0.55" />
                <stop offset="0.7" stopColor="var(--scene-3)" stopOpacity="0.35" />
                <stop offset="1" stopColor="var(--scene-1)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="scene__ribbon" d="M-100 300 C 200 180 400 380 700 260 S 1100 140 1300 220 L1300 260 C 1100 190 900 320 700 310 S 200 240 -100 340 Z" fill="url(#silk)" />
            <path className="scene__ribbon scene__ribbon--2" d="M-100 340 C 250 260 450 400 750 320 S 1100 230 1300 300 L1300 320 C 1100 270 900 360 720 350 S 250 300 -100 360 Z" fill="url(#silk)" />
          </svg>
        </>
      )}

      {theme === "ocean" && (
        <>
          <div className="scene__wash scene__wash--1" />
          <div className="scene__wash scene__wash--2" />
          <svg className="scene__waves" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path className="scene__wave scene__wave--1" d={WAVE(18, 190)} fill="var(--scene-2)" opacity="0.7" />
            <path className="scene__wave scene__wave--2" d={WAVE(14, 220)} fill="var(--scene-1)" opacity="0.5" />
            <path className="scene__wave scene__wave--3" d={WAVE(10, 250)} fill="var(--scene-3)" opacity="0.35" />
          </svg>
        </>
      )}

      {theme === "forest" && (
        <>
          <div className="scene__rays scene__rays--green" />
          <svg className="scene__ground" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path d={TREES_BACK} fill="var(--scene-1)" opacity="0.45" />
            <path d={TREES_FRONT} fill="var(--scene-3)" opacity="0.3" />
          </svg>
        </>
      )}

      {theme === "cocoa" && (
        <>
          <div className="scene__warmth" />
          <svg className="scene__mug" viewBox="0 0 220 240">
            <g fill="none" strokeLinecap="round">
              <path className="scene__steam" d="M80 90 C 60 70 100 55 80 30 C 70 18 85 8 82 0" stroke="var(--scene-3)" strokeWidth="5" />
              <path className="scene__steam scene__steam--2" d="M110 92 C 92 70 130 56 110 30 C 100 16 116 6 112 -4" stroke="var(--scene-3)" strokeWidth="5" />
              <path className="scene__steam scene__steam--3" d="M140 90 C 122 70 158 56 140 32 C 130 20 146 10 142 0" stroke="var(--scene-3)" strokeWidth="5" />
            </g>
            <path d="M52 110 H168 V180 C168 206 146 226 120 226 H100 C74 226 52 206 52 180 Z" fill="var(--scene-1)" />
            <path d="M168 128 C 196 128 200 176 168 180" fill="none" stroke="var(--scene-1)" strokeWidth="12" />
            <ellipse cx="110" cy="110" rx="58" ry="10" fill="var(--scene-3)" />
            <path d="M78 150 C 78 140 92 140 92 150 C 92 140 106 140 106 150 C 106 162 92 170 92 172 C 92 170 78 162 78 150 Z" fill="var(--scene-2)" opacity="0.8" />
          </svg>
        </>
      )}
    </div>
  );
}
