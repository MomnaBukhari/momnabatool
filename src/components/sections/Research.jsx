import { PiCompass, PiCrop } from "react-icons/pi";
import Section from "../layout/Section";
import Doodle from "../doodles/Doodle";
import { TechIcon } from "../../lib/techIcons";
import { research } from "../../data/research";
import "./Research.css";

export default function Research() {
  return (
    <Section id="research" title="Research" kicker="multilingual by design">
      <div className="research">
        <div className="research__intro">
          <div data-reveal>
            <p className="research__label hand">
              {research.degree}, {research.institution}
            </p>
            <h3 className="research__title">{research.title}</h3>
          </div>

          <div className="research__notes">
            <p className="research__margin" data-reveal>
              <PiCrop aria-hidden="true" />
              <span>{research.scope}</span>
            </p>
            <p className="research__margin" data-reveal>
              <PiCompass aria-hidden="true" />
              <span>{research.approach}</span>
            </p>
          </div>

          <blockquote className="research__question sticky-note" data-reveal style={{ "--note-color": "var(--note-1)" }}>
            <span className="pin" aria-hidden="true" />
            <p className="hand">{research.question}</p>
          </blockquote>
        </div>

        <ol className="pipeline" aria-label="How the research pipeline works">
          {research.pipeline.map((step, index) => (
            <li key={step.title} className="pipeline__step" data-reveal>
              <span className="pipeline__num" aria-hidden="true">
                {index + 1}
              </span>
              <h4>{step.title}</h4>
              <p>{step.detail}</p>
              <ul className="pipeline__tools" aria-label={`Tools for ${step.title}`}>
                {step.tools.map((tool) => (
                  <li key={tool}>
                    <TechIcon name={tool} />
                    {tool}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="research__stack" data-reveal>
          <p className="hand">
            <Doodle shape="squiggle" className="research__squiggle" />
            used throughout
          </p>
          <ul>
            {research.stack.map((tool) => (
              <li key={tool}>
                <TechIcon name={tool} />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
