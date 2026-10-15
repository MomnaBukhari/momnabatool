// The six themes: a paper and an ink each. Colours live in themes.css.
// `paper` and `ink` draw the little circle in the navbar.
// To add a theme: add an entry here and a matching [data-theme="id"] block in themes.css.

export const themes = [
  { id: "rose", name: "Rose", paper: "#fdf8f9", ink: "#d0477f", note: "#ffd3e1" },
  { id: "henna", name: "Henna", paper: "#fbf7f2", ink: "#b5652f", note: "#f9d2b5" },
  { id: "lavender", name: "Lavender", paper: "#f9f8fe", ink: "#7a5ce0", note: "#e1d6ff" },
  { id: "matcha", name: "Matcha", paper: "#f7faf3", ink: "#5f9136", note: "#d8efc4" },
  { id: "sky", name: "Sky", paper: "#f6f9fd", ink: "#2f7fd6", note: "#cfe5ff" },
  { id: "lemon", name: "Lemon", paper: "#fffcf0", ink: "#d49a00", note: "#fff09a" },
];

export const DEFAULT_THEME = "rose";
export const THEME_STORAGE_KEY = "momna-theme";
