// The theme-change chime and the background music.
//
// To change the chime, replace public/audio/ui/theme.mp3 with your own (keep
// the name), or point the path below at a new file. Any format the browser
// plays works: .mp3, .wav, .ogg.

import { gsap } from "./gsap";

export const SOUND_FILES = {
  theme: "/audio/ui/theme.mp3", // plays when the colour theme changes
};

export const MUSIC_FILE = "/audio/background.mp3";

const VOLUME = { theme: 0.5 };
const MUSIC_VOLUME = 0.35;
const STORAGE_KEY = "momna-sound";

let context = null;
let master = null;
const buffers = {};
let enabled = readEnabled();
let music = null;
let musicPlaying = false;
const listeners = new Set();

function readEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

function notify() {
  listeners.forEach((listener) => listener({ enabled, musicPlaying }));
}

/** Subscribe to on/off changes. Returns an unsubscribe function. */
export function onSoundChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const getSoundState = () => ({ enabled, musicPlaying });

// Browsers only allow audio after the visitor has interacted with the page,
// so the audio engine starts on the first click, tap or key press.
async function unlock() {
  if (context) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  context = new AudioContext();
  master = context.createGain();
  master.connect(context.destination);

  await Promise.all(
    Object.entries(SOUND_FILES).map(async ([name, url]) => {
      try {
        const response = await fetch(url);
        buffers[name] = await context.decodeAudioData(await response.arrayBuffer());
      } catch {
        // A missing sound file just means silence for that event.
      }
    })
  );
}

/** Plays one of the interface sounds by name. */
export function playSound(name) {
  if (!enabled || !context || !buffers[name]) return;
  if (context.state === "suspended") context.resume();
  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = buffers[name];
  // A touch of random pitch so repeated changes don't sound mechanical.
  source.playbackRate.value = 0.96 + Math.random() * 0.08;
  gain.gain.value = VOLUME[name] ?? 0.4;
  source.connect(gain).connect(master);
  source.start();
}

export function setSoundEnabled(next) {
  enabled = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // Not remembered in private browsing; that's fine.
  }
  if (next) unlock();
  notify();
}

/** Starts or stops the background music with a gentle fade. */
export function toggleMusic() {
  if (!music) {
    music = new Audio(MUSIC_FILE);
    music.loop = true;
    music.volume = 0;
  }

  if (musicPlaying) {
    musicPlaying = false;
    gsap.to(music, { volume: 0, duration: 0.8, onComplete: () => music.pause() });
  } else {
    musicPlaying = true;
    music
      .play()
      .then(() => gsap.to(music, { volume: MUSIC_VOLUME, duration: 1.2 }))
      .catch(() => {
        musicPlaying = false;
        notify();
      });
  }
  notify();
}

/**
 * Browsers only allow audio after the visitor has interacted with the page,
 * so this prepares the audio on the first click, tap or key press.
 * Returns a cleanup function.
 */
export function initInterfaceSounds() {
  const onFirstInteraction = () => unlock();
  window.addEventListener("pointerdown", onFirstInteraction, { once: true });
  window.addEventListener("keydown", onFirstInteraction, { once: true });
  return () => {
    window.removeEventListener("pointerdown", onFirstInteraction);
    window.removeEventListener("keydown", onFirstInteraction);
  };
}
