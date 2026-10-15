import { createContext, useCallback, useContext, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "../lib/gsap";
import { DEFAULT_THEME, THEME_STORAGE_KEY, themes } from "./themes";

const ThemeContext = createContext(null);

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return themes.some((theme) => theme.id === stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStoredTheme);

  // index.html sets the theme before anything paints; this keeps them in step.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Switches theme. If `origin` (a click position) is given and the browser
   * supports view transitions, the new theme grows out of that point as a circle.
   */
  const setTheme = useCallback((id, origin) => {
    const apply = () => {
      document.documentElement.dataset.theme = id;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, id);
      } catch {
        // Private browsing: the theme just won't be remembered.
      }
      setThemeState(id);
      window.dispatchEvent(new CustomEvent("themechange", { detail: id }));
    };

    if (!document.startViewTransition || !origin || prefersReducedMotion()) {
      apply();
      return;
    }

    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready
      .then(() => {
        const { x, y } = origin;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      })
      .catch(() => {});
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
