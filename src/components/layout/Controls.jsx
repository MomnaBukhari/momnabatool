import { useEffect, useState } from "react";
import { PiCornersIn, PiCornersOut, PiMusicNotes, PiSpeakerHigh, PiSpeakerSlash } from "react-icons/pi";
import { themes } from "../../theme/themes";
import { useTheme } from "../../theme/ThemeContext";
import { fullscreenSupported, toggleFullscreen, useIsFullscreen } from "../../lib/fullscreen";
import { getSoundState, onSoundChange, playSound, setSoundEnabled, toggleMusic } from "../../lib/sound";
import "./Controls.css";

/** The six theme circles, like the coloured buttons on a Mac window. */
export function ThemeDots({ size = "small" }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`theme-dots theme-dots--${size}`} role="radiogroup" aria-label="Colour theme">
      {themes.map((item) => (
        <button
          key={item.id}
          type="button"
          role="radio"
          aria-checked={theme === item.id}
          aria-label={`${item.name} theme`}
          title={item.name}
          data-cursor={item.name}
          className="theme-dot"
          style={{ "--paper": item.paper, "--ink-dot": item.ink, "--note-dot": item.note }}
          onClick={(event) => {
            if (item.id === theme) return;
            playSound("theme");
            const rect = event.currentTarget.getBoundingClientRect();
            setTheme(item.id, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          }}
        />
      ))}
    </div>
  );
}

function useSoundState() {
  const [state, setState] = useState(getSoundState);
  useEffect(() => onSoundChange(setState), []);
  return state;
}

/** Full screen, background music and the theme sound. */
export function MediaButtons() {
  const isFullscreen = useIsFullscreen();
  const { enabled, musicPlaying } = useSoundState();
  const [canFullscreen, setCanFullscreen] = useState(false);
  useEffect(() => setCanFullscreen(fullscreenSupported()), []);

  return (
    <div className="media-buttons">
      {canFullscreen && (
        <button
          type="button"
          className="icon-button"
          aria-pressed={isFullscreen}
          aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
          data-cursor={isFullscreen ? "Exit full screen" : "Full screen"}
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <PiCornersIn aria-hidden="true" /> : <PiCornersOut aria-hidden="true" />}
        </button>
      )}

      <button
        type="button"
        className={`icon-button${musicPlaying ? " is-playing" : ""}`}
        aria-pressed={musicPlaying}
        aria-label={musicPlaying ? "Pause music" : "Play music"}
        data-cursor={musicPlaying ? "Pause music" : "Play music"}
        onClick={toggleMusic}
      >
        {musicPlaying ? (
          <span className="equaliser" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <PiMusicNotes aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        className="icon-button"
        aria-pressed={enabled}
        aria-label={enabled ? "Turn the theme sound off" : "Turn the theme sound on"}
        data-cursor={enabled ? "Theme sound on" : "Theme sound off"}
        onClick={() => setSoundEnabled(!enabled)}
      >
        {enabled ? <PiSpeakerHigh aria-hidden="true" /> : <PiSpeakerSlash aria-hidden="true" />}
      </button>
    </div>
  );
}
