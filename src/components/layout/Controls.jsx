import { useEffect, useState } from "react";
import {
  PiCloud,
  PiCoffee,
  PiCornersIn,
  PiCornersOut,
  PiFeather,
  PiFlower,
  PiFlowerTulip,
  PiLeaf,
  PiMoonStars,
  PiMosque,
  PiMusicNotes,
  PiSnowflake,
  PiSparkle,
  PiSpeakerHigh,
  PiSpeakerSlash,
  PiTreeEvergreen,
  PiWaves,
} from "react-icons/pi";
import { themes } from "../../theme/themes";
import { useTheme } from "../../theme/ThemeContext";
import { fullscreenSupported, toggleFullscreen, useIsFullscreen } from "../../lib/fullscreen";
import { getSoundState, onSoundChange, playSound, setSoundEnabled, toggleMusic } from "../../lib/sound";
import { getEffectsEnabled, onEffectsChange, setEffectsEnabled } from "../../lib/effects";
import "./Controls.css";

// The little picture on each theme card.
const THEME_ICONS = {
  cloud: PiCloud,
  burgundy: PiFlower,
  autumn: PiLeaf,
  winter: PiSnowflake,
  heritage: PiMosque,
  fairy: PiSparkle,
  vanilla: PiFlowerTulip,
  swan: PiFeather,
  starlight: PiMoonStars,
  ocean: PiWaves,
  forest: PiTreeEvergreen,
  cocoa: PiCoffee,
};

/** All twelve themes as little cards, each a preview of its colours and mood. */
export function ThemeGrid({ onPick, compact = false }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`theme-grid${compact ? " theme-grid--compact" : ""}`} role="radiogroup" aria-label="Theme">
      {themes.map((item) => {
        const Icon = THEME_ICONS[item.id] ?? PiSparkle;
        const [paper, ink, scene] = item.swatch;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={theme === item.id}
            className="theme-card"
            style={{ "--p-paper": paper, "--p-ink": ink, "--p-scene": scene }}
            onClick={(event) => {
              if (item.id !== theme) {
                playSound("theme");
                setTheme(item.id, { x: event.clientX || innerWidth / 2, y: event.clientY || innerHeight / 2 });
              }
              onPick?.();
            }}
          >
            <span className="theme-card__preview" aria-hidden="true">
              <Icon />
            </span>
            <span className="theme-card__name">{item.name}</span>
            {!compact && <span className="theme-card__mood">{item.mood}</span>}
          </button>
        );
      })}
    </div>
  );
}

function useSoundState() {
  const [state, setState] = useState(getSoundState);
  useEffect(() => onSoundChange(setState), []);
  return state;
}

function useEffectsState() {
  const [on, setOn] = useState(getEffectsEnabled);
  useEffect(() => onEffectsChange(setOn), []);
  return on;
}

/** Theme effects, full screen, background music and the theme sound. */
export function MediaButtons({ vertical = false }) {
  const isFullscreen = useIsFullscreen();
  const { enabled, musicPlaying } = useSoundState();
  const effects = useEffectsState();
  const [canFullscreen, setCanFullscreen] = useState(false);
  useEffect(() => setCanFullscreen(fullscreenSupported()), []);

  return (
    <div className={`media-buttons${vertical ? " media-buttons--vertical" : ""}`}>
      <button
        type="button"
        className="icon-button"
        aria-pressed={effects}
        aria-label={effects ? "Turn the theme effects off" : "Turn the theme effects on"}
        data-cursor={effects ? "Effects on" : "Effects off"}
        onClick={() => setEffectsEnabled(!effects)}
      >
        <PiSparkle aria-hidden="true" className={effects ? undefined : "is-off"} />
      </button>

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
