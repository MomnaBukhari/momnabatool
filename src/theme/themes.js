// The twelve themes. Colours live in themes.css; the hero scene for each is in
// src/components/hero/HeroScene.jsx; the things that drift across the page are
// described by `effect` and drawn by src/components/ambience/Ambience.jsx.
//
// effect.ambient   what drifts on its own, and how many per second (`rate`)
// effect.touch     what a moving pointer or a touch leaves behind
// effect.burst     what bursts out on a click or tap
// effect.colors    the colours they're drawn in
//
// Particle kinds: puff, petal, leaf, snow, marigold, mughalStar, firefly,
// sparkle, blossom, feather, pearl, star, bubble, steam, heart.
//
// To add a theme: add an entry here and a matching [data-theme="id"] block in themes.css.

export const themes = [
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
    id: "burgundy",
    name: "Burgundy",
    mood: "velvet and roses",
    swatch: ["#fbf5f5", "#7b1e36", "#e9c2cc"],
    effect: {
      ambient: { kind: "petal", rate: 0.7 },
      touch: { kind: "petal", rate: 8 },
      burst: { kind: "petal", count: 14 },
      colors: ["#9c3550", "#c25a74", "#e9a2b3", "#7b1e36"],
    },
  },
  {
    id: "autumn",
    name: "Autumn",
    mood: "falling leaves",
    swatch: ["#fbf3e8", "#c8641e", "#efdf9f"],
    effect: {
      ambient: { kind: "leaf", rate: 1.1 },
      touch: { kind: "leaf", rate: 6 },
      burst: { kind: "leaf", count: 16 },
      colors: ["#c8641e", "#e08a2e", "#b43c1c", "#d9a62b", "#8a4b1c"],
    },
  },
  {
    id: "winter",
    name: "Winter",
    mood: "snow and frost",
    swatch: ["#f3f8fd", "#4f8fce", "#d3e6f6"],
    effect: {
      ambient: { kind: "snow", rate: 3 },
      touch: { kind: "snow", rate: 14 },
      burst: { kind: "snow", count: 18 },
      colors: ["#9cc3e8", "#7fb0e0", "#b9d6f1", "#6a9fd6"],
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
    id: "fairy",
    name: "Fairy",
    mood: "mint, lavender and fireflies",
    swatch: ["#f6fbf8", "#9a7ed8", "#c8f0dc"],
    effect: {
      ambient: { kind: "firefly", rate: 1.2 },
      touch: { kind: "sparkle", rate: 18 },
      burst: { kind: "sparkle", count: 22 },
      colors: ["#c3b0f5", "#9ee6c2", "#fdf3b0", "#f6c8e6"],
    },
  },
  {
    id: "vanilla",
    name: "Vanilla",
    mood: "warm cream and blossoms",
    swatch: ["#fffaf0", "#c39a52", "#f8dfcd"],
    effect: {
      ambient: { kind: "blossom", rate: 0.6 },
      touch: { kind: "blossom", rate: 7 },
      burst: { kind: "blossom", count: 12 },
      colors: ["#f6d2bd", "#f0d39a", "#f3c3b0", "#e8b98f"],
    },
  },
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
    id: "cocoa",
    name: "Cocoa",
    mood: "hot chocolate and steam",
    swatch: ["#faf4ee", "#8b5a3c", "#d9b79c"],
    effect: {
      ambient: { kind: "steam", rate: 0.8 },
      touch: { kind: "heart", rate: 6 },
      burst: { kind: "heart", count: 12 },
      colors: ["#8b5a3c", "#c48a64", "#e7c3a5", "#a9785a"],
    },
  },
];

export const DEFAULT_THEME = "cloud";
export const THEME_STORAGE_KEY = "momna-theme";
export const getTheme = (id) => themes.find((theme) => theme.id === id) ?? themes[0];
