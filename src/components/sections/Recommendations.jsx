import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Section from "../layout/Section";
import Button from "../ui/Button";
import { ScrollTrigger } from "../../lib/gsap";
import { recommendations } from "../../data/recommendations";
import "./Recommendations.css";

export default function Recommendations() {
  const [showAll, setShowAll] = useState(false);
  const featured = recommendations.filter((item) => item.featured);
  const rest = recommendations.filter((item) => !item.featured);
  const visible = showAll ? recommendations : featured;

  // The page gets taller when more quotes appear, so scroll animations re-measure.
  useEffect(() => {
    if (showAll) ScrollTrigger.refresh();
  }, [showAll]);

  return (
    <Section
      id="recommendations"
      title="Kind words"
      kicker="from people I've worked with and learned from"
    >
      <ul className="quotes">
        {visible.map((item, index) => (
          <Quote key={item.name} item={item} tilt={index % 2 ? 0.8 : -0.8} />
        ))}
      </ul>

      {rest.length > 0 && !showAll && (
        <div className="quotes__more">
          <Button variant="outline" onClick={() => setShowAll(true)}>
            Show {rest.length} more
          </Button>
        </div>
      )}
    </Section>
  );
}

/** One recommendation on an index card. Long ones fold to a few lines with "Read more". */
function Quote({ item, tilt }) {
  const [open, setOpen] = useState(false);
  const [long, setLong] = useState(false);
  const textRef = useRef(null);

  // Only offer "Read more" when the words actually overflow the folded card.
  useLayoutEffect(() => {
    const text = textRef.current;
    setLong(text.scrollHeight > text.clientHeight + 2);
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [open]);

  return (
    <li className="quote" data-reveal={item.featured ? "" : undefined} style={{ "--tilt": `${tilt}deg` }}>
      <figure>
        <blockquote>
          <p ref={textRef} className={open ? "is-open" : undefined}>
            {item.text}
          </p>
        </blockquote>
        {long && (
          <button type="button" className="quote__more hand" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? "Read less" : "Read more"}
          </button>
        )}
        <figcaption>
          {item.profile ? (
            <a className="quote__name hand" href={item.profile} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
          ) : (
            <span className="quote__name hand">{item.name}</span>
          )}
          <span className="quote__title">{item.title}</span>
        </figcaption>
      </figure>
    </li>
  );
}
