// The make-your-own theme: pick a background, a text colour and an accent, and
// every other colour on the site is worked out from those three, keeping text
// readable. Saved in the browser so it's still there next visit.

const COLORS_KEY = "momna-custom-colors";
const VARS_KEY = "momna-custom-vars";

export const DEFAULT_CUSTOM = { bg: "#fdfcff", text: "#1d1d1f", accent: "#9a7ed8" };

const toRgb = (hex) => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const toHex = (rgb) => `#${rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("")}`;

/** Mixes two hex colours; amount is how much of `b` to use (0–1). */
export const mix = (a, b, amount) => {
  const x = toRgb(a);
  const y = toRgb(b);
  return toHex(x.map((v, i) => v + (y[i] - v) * amount));
};

const luminance = (hex) => {
  const [r, g, b] = toRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** WCAG contrast ratio between two hex colours (1 to 21). */
export const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const rgba = (hex, alpha) => `rgba(${toRgb(hex).join(", ")}, ${alpha})`;

/** Every CSS variable the site uses, built from three colours. */
export function buildCustomVars({ bg, text, accent }) {
  const dark = luminance(bg) < 0.3;
  // Make the accent dark (or light) enough to use for links and buttons.
  let accentInk = accent;
  for (let step = 0; step < 10 && contrast(accentInk, bg) < 4.5; step += 1) accentInk = mix(accentInk, text, 0.15);
  const onAccent = contrast("#ffffff", accentInk) >= contrast("#141414", accentInk) ? "#ffffff" : "#141414";
  const notes = [mix(accent, "#ffffff", 0.72), "#fff1b8", mix(accent, "#ffffff", 0.85), "#e3f1e4"];

  return {
    "color-scheme": dark ? "dark" : "light",
    "--bg": bg,
    "--bg-alt": mix(bg, text, 0.05),
    "--surface": dark ? mix(bg, "#ffffff", 0.06) : mix(bg, "#ffffff", 0.6),
    "--ink": text,
    "--ink-soft": mix(text, bg, 0.12),
    "--ink-faint": mix(text, bg, 0.35),
    "--line": rgba(text, 0.2),
    "--accent": accent,
    "--accent-ink": accentInk,
    "--accent-soft": mix(accent, bg, 0.82),
    "--on-accent": onAccent,
    "--note-1": notes[0],
    "--note-2": notes[1],
    "--note-3": notes[2],
    "--note-4": notes[3],
    "--note-ink": "#1d1d1f",
    "--pastel-1": notes[0],
    "--pastel-2": notes[2],
    "--pastel-3": notes[1],
    "--scene-1": mix(accent, bg, 0.7),
    "--scene-2": mix(bg, text, 0.05),
    "--scene-3": accent,
    "--aura": mix(accent, "#ffffff", 0.3),
    "--gradient": `linear-gradient(100deg, ${accentInk}, ${accent})`,
    "--grid": rgba(accentInk, dark ? 0.14 : 0.08),
    "--glass": rgba(bg, 0.62),
    "--glass-strong": rgba(bg, 0.86),
    "--glass-border": dark ? "rgba(255, 255, 255, 0.14)" : "rgba(255, 255, 255, 0.75)",
    "--key-top": dark ? mix(bg, "#ffffff", 0.1) : "#ffffff",
    "--key-bottom": mix(bg, text, 0.06),
  };
}

export function loadCustomColors() {
  try {
    return { ...DEFAULT_CUSTOM, ...JSON.parse(localStorage.getItem(COLORS_KEY) || "{}") };
  } catch {
    return DEFAULT_CUSTOM;
  }
}

/** Paints the page with these colours and remembers them. */
export function applyCustomColors(colors) {
  const vars = buildCustomVars(colors);
  const root = document.documentElement;
  Object.entries(vars).forEach(([name, value]) => root.style.setProperty(name, value));
  try {
    localStorage.setItem(COLORS_KEY, JSON.stringify(colors));
    localStorage.setItem(VARS_KEY, JSON.stringify(vars));
  } catch {
    // Not remembered in private browsing; that's fine.
  }
}

/** Removes the custom colours so a regular theme shows through. */
export function clearCustomColors() {
  const root = document.documentElement;
  Object.keys(buildCustomVars(DEFAULT_CUSTOM)).forEach((name) => root.style.removeProperty(name));
}
