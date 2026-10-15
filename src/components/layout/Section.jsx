import Doodle from "../doodles/Doodle";
import "./Section.css";

/**
 * A page section. The title is set in black; the kicker is a short
 * handwritten note beside it, with a little ink arrow.
 * tone: "white" (the paper) | "grey" (a slightly deeper paper).
 */
export default function Section({ id, title, kicker, tone = "white", className = "", children }) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} className={`section section--${tone} ${className}`.trim()} aria-labelledby={headingId}>
      <div className="container">
        <h2 id={headingId} className="section__title" tabIndex={-1} data-reveal>
          <span className="section__name">{title}</span>
          {kicker && (
            <span className="section__kicker hand">
              <Doodle shape="arrow" className="section__arrow" />
              {kicker}
            </span>
          )}
        </h2>
        <div className="section__body">{children}</div>
      </div>
    </section>
  );
}
