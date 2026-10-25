import { useEffect, useState } from "react";
import { TechIcon } from "../../lib/techIcons";
import { prefersReducedMotion } from "../../lib/gsap";
import "./SkillTicker.css";

/**
 * The tools I use, a handful at a time, like a departure board: every few
 * seconds the whole row flips over, tile after tile, to show the next set.
 * Screen readers get the full list at once.
 */
export default function SkillTicker({ items }) {
  const [perRow, setPerRow] = useState(7);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 699px)");
    const update = () => setPerRow(media.matches ? 3 : 7);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const timer = window.setInterval(() => setPage((value) => value + 1), 2800);
    return () => window.clearInterval(timer);
  }, []);

  const start = (page * perRow) % items.length;
  const row = Array.from({ length: perRow }, (_, i) => items[(start + i) % items.length]);

  return (
    <div className="ticker">
      <p className="ticker__label hand">tools I reach for</p>
      <ul className="visually-hidden" aria-label="Tools I use">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ul className="ticker__row" aria-hidden="true">
        {row.map((item, index) => (
          <li key={index} className="ticker__slot">
            <span key={`${page}-${item}`} className="ticker__face" style={{ animationDelay: `${index * 70}ms` }}>
              <TechIcon name={item} />
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
