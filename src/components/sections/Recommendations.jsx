import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PiBookOpen, PiCaretLeft, PiCaretRight, PiLinkedinLogo, PiX } from "react-icons/pi";
import Section from "../layout/Section";
import Doodle from "../doodles/Doodle";
import { ScrollTrigger } from "../../lib/gsap";
import { recommendations } from "../../data/recommendations";
import { profile } from "../../data/profile";
import "./Recommendations.css";

// A little doodle in the corner of each page, taking turns.
const STICKERS = ["heart", "sparkle", "flower"];

/** Wide screens show two pages at a time; phones show one. */
function useSpread() {
  const query = "(min-width: 820px)";
  const [spread, setSpread] = useState(() => typeof window === "undefined" || window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setSpread(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return spread;
}

/**
 * Kind words, as a small storybook. Closed, it's a cover on the table; open it
 * and every page is a recommendation. Turn pages with the arrows, by clicking
 * a page, or with the arrow keys. It never grows the page: more recommendations
 * just make the book thicker.
 */
export default function Recommendations() {
  const spread = useSpread();
  const [turned, setTurned] = useState(0);
  const bookRef = useRef(null);

  // Every page in reading order, after the cover.
  const pages = useMemo(
    () => [
      { type: "dedication" },
      ...recommendations.map((item, index) => ({ type: "quote", item, index })),
      { type: "end" },
    ],
    []
  );

  // Leaves: sheets that turn. The cover is the first. On wide screens each
  // sheet carries two pages (front and back); on phones, one.
  const leaves = useMemo(() => {
    const list = [{ front: { type: "cover" }, back: spread ? pages[0] : null }];
    const rest = spread ? pages.slice(1) : pages;
    if (spread) {
      for (let i = 0; i < rest.length; i += 2) list.push({ front: rest[i], back: rest[i + 1] ?? { type: "blank" } });
    } else {
      rest.forEach((page) => list.push({ front: page, back: null }));
    }
    return list;
  }, [pages, spread]);

  const total = leaves.length;
  const open = turned > 0;
  const finished = turned === total;

  const go = useCallback(
    (next) => setTurned((value) => Math.min(total, Math.max(0, typeof next === "function" ? next(value) : next))),
    [total]
  );

  useEffect(() => {
    setTurned((value) => Math.min(value, total));
  }, [total]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [open]);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go((v) => v + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go((v) => v - 1);
    } else if (event.key === "Escape" && open) {
      go(0);
    }
  };

  // A little sparkle where you open the book.
  const sparkle = (event) => {
    window.dispatchEvent(
      new CustomEvent("ambience:burst", { detail: { x: event.clientX, y: event.clientY, kind: "sparkle", count: 18 } })
    );
  };

  const status = !open
    ? "The book is closed."
    : finished
      ? "The end of the book."
      : `Turned ${turned} of ${total} pages.`;

  return (
    <Section id="recommendations" title="Kind words" kicker="a little book of them, open it">
      <div className="kind">
        <div
          ref={bookRef}
          className={`book${open ? " is-open" : ""}${spread ? " is-spread" : " is-single"}${finished ? " is-finished" : ""}`}
          tabIndex={0}
          role="group"
          aria-roledescription="book"
          aria-label="Recommendations. Use the left and right arrow keys to turn the pages."
          onKeyDown={onKeyDown}
        >
          <div className="book__inner">
            {/* What's underneath every sheet on the right: the inside back cover. */}
            <div className="book__base">
              <div className="book__page book__page--end">
                <Doodle shape="heart" className="book__end-heart" />
                <p className="hand">That&apos;s the whole book, for now.</p>
                <button type="button" className="book__close" onClick={() => go(0)}>
                  <PiX aria-hidden="true" /> Close the book
                </button>
              </div>
            </div>

            {leaves.map((leaf, index) => {
              const isTurned = index < turned;
              // Unturned sheets: the first on top. Turned sheets: the latest on top.
              const z = isTurned ? index + 1 : total - index + 1;
              return (
                <div
                  key={index}
                  className={`leaf${isTurned ? " is-turned" : ""}${index === 0 ? " leaf--cover" : ""}`}
                  style={{ zIndex: z }}
                  onClick={(event) => {
                    if (index === 0 && !open) sparkle(event);
                    go(isTurned ? index : index + 1);
                  }}
                  data-cursor-magic={index === 0 && !open ? "Open me" : undefined}
                  data-cursor={index === 0 && !open ? undefined : isTurned ? "Back" : "Turn"}
                >
                  <div className="leaf__face leaf__front">
                    <Page page={leaf.front} sticker={index} pageNumber={spread ? index * 2 : index} />
                  </div>
                  {leaf.back && (
                    <div className="leaf__face leaf__back">
                      <Page page={leaf.back} sticker={index + 1} pageNumber={index * 2 + 1} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="book__controls">
          {!open ? (
            <button type="button" className="book__open" onClick={(event) => { sparkle(event); go(1); }} data-cursor-magic="Open me">
              <PiBookOpen aria-hidden="true" /> Open the book
            </button>
          ) : (
            <>
              <button type="button" className="book__nav" onClick={() => go((v) => v - 1)} aria-label="Previous page">
                <PiCaretLeft aria-hidden="true" />
              </button>
              <p className="book__count hand">
                {finished ? "the end" : `page ${turned} of ${total - 1}`}
              </p>
              <button type="button" className="book__nav" onClick={() => go((v) => v + 1)} aria-label="Next page" disabled={finished}>
                <PiCaretRight aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        <p className="visually-hidden" aria-live="polite">
          {status}
        </p>
      </div>
    </Section>
  );
}

/** One page of the book. */
function Page({ page, sticker, pageNumber }) {
  if (page.type === "cover") {
    return (
      <div className="book__cover">
        <span className="book__foil" aria-hidden="true" />
        <Doodle shape="flower" className="book__cover-flower" />
        <p className="book__cover-small hand">a little book of</p>
        <p className="book__cover-title glitter aura">Kind words</p>
        <p className="book__cover-sub">from people I&apos;ve worked with and learned from</p>
        <span className="book__sticker book__sticker--1" aria-hidden="true">
          {recommendations.length} notes
        </span>
        <span className="book__ribbon" aria-hidden="true" />
      </div>
    );
  }

  if (page.type === "dedication") {
    return (
      <div className="book__page book__page--dedication">
        <p className="hand book__dedication">
          Written by mentors, teammates and teachers, and kept here with thanks.
        </p>
        <Doodle shape="squiggle" className="book__squiggle" />
        <p className="book__signed hand">{profile.firstName}</p>
      </div>
    );
  }

  if (page.type === "end") {
    return (
      <div className="book__page book__page--dedication">
        <p className="hand book__dedication">Worked with me? I&apos;d love a page of yours.</p>
        <a
          className="book__add"
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
        >
          <PiLinkedinLogo aria-hidden="true" /> Write one on LinkedIn
        </a>
        <span className="book__folio">{pageNumber}</span>
      </div>
    );
  }

  if (page.type === "blank") return <div className="book__page" />;

  const { item } = page;
  return (
    <figure className="book__page book__quote">
      <Doodle shape={STICKERS[sticker % STICKERS.length]} className="book__page-sticker" />
      <blockquote>
        <p>{item.text}</p>
      </blockquote>
      <figcaption>
        {item.profile ? (
          <a
            className="book__name hand"
            href={item.profile}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            {item.name}
          </a>
        ) : (
          <span className="book__name hand">{item.name}</span>
        )}
        <span className="book__title">{item.title}</span>
      </figcaption>
      <span className="book__folio">{pageNumber}</span>
    </figure>
  );
}
