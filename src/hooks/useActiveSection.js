import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in the reading area of the viewport,
 * so the navigation can mark where you are.
 */
export default function useActiveSection(ids, routeKey) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    setActive(null);
    if (!elements.length) return undefined;

    // A thin band a third of the way down the screen decides which section is "current".
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    // Above the first section (in the hero) nothing is active.
    const onScroll = () => {
      if (window.scrollY < elements[0].offsetTop - window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, routeKey]);

  return active;
}
