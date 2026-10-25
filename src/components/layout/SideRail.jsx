import { themes } from "../../theme/themes";
import { useTheme } from "../../theme/ThemeContext";
import { playSound } from "../../lib/sound";
import { MediaButtons } from "./Controls";
import "./SideRail.css";

/**
 * Two slim rails tucked into the bottom corners, out of the way of the content:
 * themes on the left (a column of little swatches, each naming itself on hover)
 * and the controls on the right (effects, full screen, music, sound).
 * Phones get both inside the menu instead.
 */
export default function SideRail() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <aside className="rail rail--themes" aria-label="Themes">
        <div className="rail__bar" role="radiogroup" aria-label="Theme">
          {themes.map((item) => {
            const [paper, ink, scene] = item.swatch;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={theme === item.id}
                aria-label={`${item.name}: ${item.mood}`}
                className="rail__dot"
                style={{ "--p-paper": paper, "--p-ink": ink, "--p-scene": scene }}
                onClick={(event) => {
                  if (item.id === theme) return;
                  playSound("theme");
                  const rect = event.currentTarget.getBoundingClientRect();
                  setTheme(item.id, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                }}
              >
                <span className="rail__tip" aria-hidden="true">
                  <strong>{item.name}</strong> {item.mood}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <aside className="rail rail--controls" aria-label="Effects and media">
        <div className="rail__bar">
          <MediaButtons vertical />
        </div>
      </aside>
    </>
  );
}
