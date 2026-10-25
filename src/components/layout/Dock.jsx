import { getTheme, themes } from "../../theme/themes";
import { useTheme } from "../../theme/ThemeContext";
import { playSound } from "../../lib/sound";
import { MediaButtons } from "./Controls";
import "./Dock.css";

/**
 * The dock: one small glass bar centred at the bottom of the screen, like the
 * dock on a Mac. Every theme sits in it as a little swatch that grows as the
 * pointer passes over, with its name above; the controls sit at the end.
 * Phones get the same things inside the menu instead.
 */
export default function Dock() {
  const { theme, setTheme } = useTheme();
  const current = getTheme(theme);

  return (
    <aside className="dock" aria-label="Themes and controls">
      <div className="dock__bar">
        <p className="dock__current hand" aria-live="polite">
          {current.name}
        </p>

        <div className="dock__themes" role="radiogroup" aria-label="Theme">
          {themes.map((item) => {
            const [paper, ink, scene] = item.swatch;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={theme === item.id}
                aria-label={`${item.name}: ${item.mood}`}
                className="dock__dot"
                style={{ "--p-paper": paper, "--p-ink": ink, "--p-scene": scene }}
                onClick={(event) => {
                  if (item.id === theme) return;
                  playSound("theme");
                  const rect = event.currentTarget.getBoundingClientRect();
                  setTheme(item.id, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                }}
              >
                <span className="dock__tip" aria-hidden="true">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        <span className="dock__divider" aria-hidden="true" />
        <MediaButtons />
      </div>
    </aside>
  );
}
