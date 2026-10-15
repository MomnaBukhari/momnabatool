import { useEffect, useState } from "react";

export const fullscreenSupported = () =>
  typeof document !== "undefined" &&
  Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled);

export function toggleFullscreen() {
  const element = document.documentElement;
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else {
    (element.requestFullscreen || element.webkitRequestFullscreen).call(element);
  }
}

/** True while the page is full screen. */
export function useIsFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  return isFullscreen;
}
