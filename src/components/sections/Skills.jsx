import Section from "../layout/Section";
import { TechIcon } from "../../lib/techIcons";
import { skills } from "../../data/skills";
import "./Skills.css";

/** Skills as keyboard keys: each group is a row of keycaps with a logo or icon. */
export default function Skills() {
  return (
    <Section id="skills" title="Skills" kicker="grouped by how I use them, strongest first" tone="grey">
      <div className="keys">
        {skills.map((group) => (
          <section key={group.title} className={`keys__group${group.primary ? " is-primary" : ""}`} data-reveal>
            <header className="keys__head">
              <h3>{group.title}</h3>
              {group.note && <p className="keys__note hand">{group.note}</p>}
            </header>
            <ul className="keys__list">
              {group.items.map((item) => (
                <li key={item} className="keycap">
                  <TechIcon name={item} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
