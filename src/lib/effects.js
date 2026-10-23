// Whether the theme's drifting particles are on. Remembered between visits.

const STORAGE_KEY = "momna-effects";
const listeners = new Set();

let enabled = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
})();

export const getEffectsEnabled = () => enabled;

export function setEffectsEnabled(next) {
  enabled = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // Not remembered in private browsing; that's fine.
  }
  listeners.forEach((listener) => listener(enabled));
}

/** Subscribe to on/off changes. Returns an unsubscribe function. */
export function onEffectsChange(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
