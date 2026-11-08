import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  PiArrowRight,
  PiCopySimple,
  PiEnvelopeSimple,
  PiFileText,
  PiGithubLogo,
  PiLinkedinLogo,
  PiMagnifyingGlass,
  PiMusicNotes,
  PiSparkle,
  PiCornersOut,
  PiSpeakerHigh,
  PiHash,
  PiCheck,
} from "react-icons/pi";
import { themes } from "../../theme/themes";
import { useTheme } from "../../theme/ThemeContext";
import { profile, sections } from "../../data/profile";
import { cv } from "../../data/statement";
import { projects } from "../../projects";
import { scrollToSection, lockScroll } from "../../lib/scroll";
import { playSound, toggleMusic, setSoundEnabled, getSoundState } from "../../lib/sound";
import { getEffectsEnabled, setEffectsEnabled } from "../../lib/effects";
import { fullscreenSupported, toggleFullscreen } from "../../lib/fullscreen";
import { usePageTransition } from "./PageTransition";
import { THEME_ICONS } from "./Controls";
import "./CommandPalette.css";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
// eslint-disable-next-line react-refresh/only-export-components
export const PALETTE_SHORTCUT = isMac ? "⌘K" : "Ctrl K";

/** Opens the palette from anywhere: window.dispatchEvent(new Event("palette:open")). */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const lastFocus = useRef(null);
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const go = usePageTransition();

  useEffect(() => {
    const onKey = (event) => {
      const typing = /input|textarea|select/i.test(event.target.tagName) || event.target.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "/" && !typing && !open) {
        event.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, [open]);

  useEffect(() => {
    lockScroll(open);
    if (open) {
      lastFocus.current = document.activeElement;
      setQuery("");
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      lastFocus.current?.focus?.();
    }
  }, [open]);

  const flash = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 1800);
  };

  const commands = useMemo(() => {
    const toSection = (id, label) => () => {
      if (pathname === "/") scrollToSection(id);
      else go(`/#${id}`, label);
    };
    const list = [
      ...sections.map((section) => ({
        group: "Go to",
        label: section.label,
        hint: `#${section.id}`,
        icon: PiHash,
        run: toSection(section.id, section.label),
      })),
      { group: "Go to", label: "Personal statement & CV", hint: profile.cv, icon: PiFileText, run: () => go(profile.cv, "Statement & CV") },
      ...projects.map((project) => ({
        group: "Projects",
        label: project.title,
        hint: project.tagline,
        icon: PiArrowRight,
        run: () => go(`/projects/${project.slug}`, project.title),
      })),
      ...themes.map((item) => ({
        group: "Themes",
        label: `${item.name} theme`,
        hint: item.id === theme ? "current" : item.mood,
        icon: THEME_ICONS[item.id] ?? PiSparkle,
        swatch: item.swatch,
        run: () => {
          if (item.id !== theme) {
            playSound("theme");
            setTheme(item.id, { x: innerWidth / 2, y: innerHeight / 2 });
          }
        },
      })),
      {
        group: "Actions",
        label: "Copy my email address",
        hint: profile.email,
        icon: PiCopySimple,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            flash("Email copied");
          } catch {
            flash(profile.email);
          }
        },
        keepOpen: true,
      },
      {
        group: "Actions",
        label: "Download my CV",
        hint: "PDF",
        icon: PiFileText,
        run: () => {
          const link = Object.assign(document.createElement("a"), { href: cv.pdf, download: cv.fileName });
          link.click();
        },
      },
      {
        group: "Actions",
        label: "Write me an email",
        hint: "opens your mail app",
        icon: PiEnvelopeSimple,
        run: () => {
          window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}`;
        },
      },
      { group: "Actions", label: "Open LinkedIn", hint: "new tab", icon: PiLinkedinLogo, run: () => window.open(profile.links.linkedin, "_blank", "noopener") },
      { group: "Actions", label: "Open GitHub", hint: "new tab", icon: PiGithubLogo, run: () => window.open(profile.links.github, "_blank", "noopener") },
      { group: "Actions", label: "Play or pause music", hint: "background music", icon: PiMusicNotes, run: toggleMusic },
      {
        group: "Actions",
        label: "Toggle theme sound",
        hint: "the chime on theme change",
        icon: PiSpeakerHigh,
        run: () => setSoundEnabled(!getSoundState().enabled),
      },
      { group: "Actions", label: "Toggle theme effects", hint: "drifting particles", icon: PiSparkle, run: () => setEffectsEnabled(!getEffectsEnabled()) },
    ];
    if (fullscreenSupported()) list.push({ group: "Actions", label: "Toggle full screen", hint: "", icon: PiCornersOut, run: toggleFullscreen });
    return list;
  }, [theme, setTheme, pathname, go]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const words = q.split(/\s+/);
    return commands.filter((command) => {
      const hay = `${command.label} ${command.group} ${command.hint}`.toLowerCase();
      return words.every((word) => hay.includes(word));
    });
  }, [commands, query]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const execute = (command) => {
    if (!command) return;
    if (!command.keepOpen) setOpen(false);
    // Let the palette close (and the page unlock) before scrolling or navigating.
    setTimeout(() => command.run(), command.keepOpen ? 0 : 60);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((value) => Math.min(results.length - 1, value + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((value) => Math.max(0, value - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      execute(results[index]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  if (!open) return toast ? <div className="palette-toast">{toast}</div> : null;

  let lastGroup = null;
  return (
    <div className="palette" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <div className="palette__box" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="palette__search">
          <PiMagnifyingGlass aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, a project, a theme…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `palette-${index}` : undefined}
          />
          <kbd>esc</kbd>
        </div>

        <ul ref={listRef} id="palette-list" className="palette__list" role="listbox">
          {results.length === 0 && <li className="palette__empty">Nothing matches “{query}”.</li>}
          {results.map((command, i) => {
            const Icon = command.icon;
            const header = command.group !== lastGroup ? command.group : null;
            lastGroup = command.group;
            return (
              <li key={`${command.group}-${command.label}`} role="presentation">
                {header && <p className="palette__group">{header}</p>}
                <div
                  id={`palette-${i}`}
                  role="option"
                  aria-selected={i === index}
                  className="palette__item"
                  onMouseMove={() => setIndex(i)}
                  onClick={() => execute(command)}
                >
                  <span
                    className="palette__icon"
                    style={command.swatch ? { background: command.swatch[0], color: command.swatch[1] } : undefined}
                  >
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="palette__label">{command.label}</span>
                  <span className="palette__hint">
                    {command.hint === "current" ? <PiCheck aria-label="current" /> : command.hint}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="palette__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span className="palette__brand">momna.os</span>
        </div>
      </div>
      {toast && <div className="palette-toast">{toast}</div>}
    </div>
  );
}
