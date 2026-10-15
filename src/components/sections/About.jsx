import { PiBriefcase, PiCode, PiFlask } from "react-icons/pi";
import Section from "../layout/Section";
import Doodle from "../doodles/Doodle";
import { about } from "../../data/profile";
import "./About.css";

const ICONS = { briefcase: PiBriefcase, code: PiCode, flask: PiFlask };

export default function About() {
  return (
    <Section id="about" title="About" kicker="backend first, with research in AI">
      <div className="about">
        <div className="about__main">
          <p className="about__lead" data-reveal>
            {about.lead}
          </p>

          <ol className="about__chapters">
            {about.chapters.map((chapter) => {
              const Icon = ICONS[chapter.icon] ?? PiCode;
              return (
                <li key={chapter.title} className="about__card" data-reveal>
                  <span className="about__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <p className="about__when hand">{chapter.when}</p>
                    <h3>{chapter.title}</h3>
                    <p className="about__text">{chapter.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="about__side">
          <dl className="about__index" data-reveal>
            {about.facts.map((fact) => (
              <div key={fact.term}>
                <dt className="hand">{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="about__beyond sticky-note" data-reveal style={{ "--note-color": "var(--note-3)" }}>
            <span className="tape" aria-hidden="true" />
            <Doodle shape="flower" className="about__flower" />
            <h3 className="hand">Beyond the job title</h3>
            <ul>
              {about.beyond.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
