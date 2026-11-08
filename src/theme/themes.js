// The six themes. Colours live in themes.css; the hero scene for each is in
// src/components/hero/HeroScene.jsx; the things that drift across the page are
// described by `effect` and drawn by src/components/ambience/Ambience.jsx.
//
// effect.ambient   what drifts on its own, and how many per second (`rate`)
// effect.touch     what a moving pointer or a touch leaves behind
// effect.burst     what bursts out on a click or tap
// effect.colors    the colours they're drawn in
//
// Particle kinds: puff, petal, leaf, snow, marigold, mughalStar, firefly,
// sparkle, blossom, feather, pearl, star, bubble, steam, heart, lantern.

//
// To add a theme: add an entry here and a matching [data-theme="id"] block in themes.css.

export const themes = [
  {
    id: "swan",
    name: "Swan",
    mood: "white feathers and pearl",
    swatch: ["#fdfcfd", "#a596cc", "#efe9f7"],
    effect: {
      ambient: { kind: "feather", rate: 0.45 },
      touch: { kind: "pearl", rate: 12 },
      burst: { kind: "feather", count: 8 },
      colors: ["#ffffff", "#f3eefa", "#e6def6", "#fbf3f7"],
    },
  },
  {
    id: "cloud",
    name: "Cloud",
    mood: "calm, blue-grey and quiet",
    swatch: ["#f6f8fb", "#6f8fb3", "#c9d6e6"],
    effect: {
      ambient: { kind: "puff", rate: 0.6 },
      touch: { kind: "puff", rate: 10 },
      burst: { kind: "sparkle", count: 10 },
      colors: ["#b9cbe2", "#a9c0dc", "#c9d6e6", "#94b0d4"],
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    mood: "soft waves in watercolour",
    swatch: ["#f3f9fb", "#2f93ad", "#9fd4e2"],
    effect: {
      ambient: { kind: "bubble", rate: 0.9 },
      touch: { kind: "bubble", rate: 10 },
      burst: { kind: "bubble", count: 16 },
      colors: ["#9fd4e2", "#5fb2c8", "#cfeaf0", "#ffffff"],
    },
  },
  {
    id: "forest",
    name: "Forest",
    mood: "emerald and sage",
    swatch: ["#f4f8f2", "#3f8a5f", "#a9cdb2"],
    effect: {
      ambient: { kind: "leaf", rate: 0.7 },
      touch: { kind: "firefly", rate: 9 },
      burst: { kind: "leaf", count: 14 },
      colors: ["#3f8a5f", "#6fa77b", "#9cc28a", "#2f6b48", "#c9d98f"],
    },
  },
  {
    id: "heritage",
    name: "Heritage",
    mood: "old Lahore: sandstone, marble and tiles",
    swatch: ["#fbf5ec", "#b5523b", "#2f7c7a"],
    effect: {
      ambient: { kind: "marigold", rate: 0.6 },
      touch: { kind: "marigold", rate: 7 },
      burst: { kind: "mughalStar", count: 12 },
      colors: ["#e8a33a", "#f2b84b", "#d9822b", "#2f7c7a", "#b5523b"],
    },
  },
  {
    id: "starlight",
    name: "Starlight",
    mood: "a starry sky in silk",
    dark: true,
    swatch: ["#0f1430", "#c6b6ff", "#7b5fd6"],
    effect: {
      ambient: { kind: "star", rate: 2 },
      touch: { kind: "sparkle", rate: 16 },
      burst: { kind: "star", count: 20 },
      colors: ["#ffffff", "#e0d4ff", "#c6b6ff", "#ffe8b0"],
    },
  },
];

export const DEFAULT_THEME = "swan";
export const THEME_STORAGE_KEY = "momna-theme";
export const getTheme = (id) => themes.find((theme) => theme.id === id) ?? themes[0];
