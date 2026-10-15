import Section from "../layout/Section";
import { activities, awards, certifications, education, memberships } from "../../data/education";
import "./Education.css";

function List({ items, title, meta, year }) {
  return (
    <ul className="credentials__list">
      {items.map((item) => (
        <li key={title(item)}>
          <div>
            <p className="credentials__title">{title(item)}</p>
            {meta(item) && <p className="credentials__meta">{meta(item)}</p>}
          </div>
          {year(item) && <p className="credentials__year">{year(item)}</p>}
        </li>
      ))}
    </ul>
  );
}

export default function Education() {
  return (
    <Section
      id="education"
      title="Education"
      kicker="and what I've earned along the way"
      tone="grey"
    >
      <div className="credentials">
        <section className="credentials__block credentials__block--wide" data-reveal>
          <h3>Education</h3>
          <ul className="credentials__list">
            {education.map((item) => (
              <li key={item.qualification}>
                <div>
                  <p className="credentials__title">{item.qualification}</p>
                  <p className="credentials__meta">{item.institution}</p>
                  {item.detail && <p className="credentials__detail">{item.detail}</p>}
                </div>
                <p className="credentials__year">{item.period}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="credentials__block" data-reveal>
          <h3>Certifications</h3>
          <List items={certifications} title={(i) => i.title} meta={(i) => i.issuer} year={(i) => i.year} />
        </section>

        <section className="credentials__block" data-reveal>
          <h3>Awards</h3>
          <List items={awards} title={(i) => i.title} meta={(i) => i.issuer} year={(i) => i.year} />
        </section>

        <section className="credentials__block" data-reveal>
          <h3>Activities</h3>
          <List items={activities} title={(i) => i.title} meta={(i) => i.detail} year={(i) => i.year} />
        </section>

        <section className="credentials__block" data-reveal>
          <h3>Memberships</h3>
          <List
            items={[memberships]}
            title={(i) => i.organisation}
            meta={(i) => i.groups.join(", ")}
            year={(i) => `Since ${i.since}`}
          />
        </section>
      </div>
    </Section>
  );
}
