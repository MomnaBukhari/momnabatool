import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PiBriefcase, PiCode, PiFlask, PiMedal, PiGraduationCap, PiCertificate, PiMapPin, PiHeart, PiUserFocus } from "react-icons/pi";
import Section from "../layout/Section";
import { TechIcon } from "../../lib/techIcons";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { about, profile } from "../../data/profile";
import "./About.css";

const ICONS = { briefcase: PiBriefcase, code: PiCode, flask: PiFlask };
const CORE = ["PHP", "Laravel", "MySQL", "REST APIs", "AWS Lambda", "Amazon S3", "React", "Python"];

/** The time in Greater Manchester, ticking. */
function useUkTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * About, as a bento grid: one statement tile and a set of small, true, checkable
 * facts around it. A soft light follows the pointer across the tiles.
 */
export default function About() {
  const gridRef = useRef(null);
  const time = useUkTime();

  // The spotlight: every tile knows where the pointer is, relative to itself.
  useEffect(() => {
    const grid = gridRef.current;
    const onMove = (event) => {
      grid.querySelectorAll(".bento__tile").forEach((tile) => {
        const rect = tile.getBoundingClientRect();
        tile.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        tile.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };
    grid.addEventListener("pointermove", onMove);
    return () => grid.removeEventListener("pointermove", onMove);
  }, []);

  // The big number counts up the first time it's seen.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = gridRef.current.querySelector("[data-count]");
      const counter = { value: 0 };
      gsap.to(counter, {
        value: Number(el.dataset.count),
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = Math.round(counter.value);
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <Section id="about" title="About" kicker="backend at heart, creative by nature">
      <div ref={gridRef} className="bento">
        <article className="bento__tile bento__tile--lead" data-reveal>
          <p className="bento__label">
            <PiUserFocus aria-hidden="true" /> who I am
          </p>
          <p className="bento__lead">{about.lead}</p>
          <div className="bento__status">
            <span className="bento__chip bento__chip--live">
              <span className="bento__pulse" aria-hidden="true" /> Open to opportunities
            </span>
            <span className="bento__chip">
              <PiMapPin aria-hidden="true" /> {profile.location} · {time}
            </span>
          </div>
        </article>

        <article className="bento__tile bento__tile--years" data-reveal>
          <p className="bento__label">in production</p>
          <p className="bento__big">
            <span className="bento__almost">almost</span>
            <span data-count="5">5</span>
            <span className="bento__unit">years</span>
          </p>
          <p className="bento__small">Building, releasing and supporting real systems.</p>
        </article>

        <article className="bento__tile bento__tile--solo" data-reveal>
          <p className="bento__label">proudest</p>
          <p className="bento__headline">Sole engineer on ScanPass</p>
          <p className="bento__small">System design, data modelling, APIs and deployment. Every technical decision was mine.</p>
        </article>

        <article className="bento__tile bento__tile--timeline" data-reveal>
          <p className="bento__label">
            <PiBriefcase aria-hidden="true" /> the path so far
          </p>
          <ol className="bento__timeline">
            {about.chapters.map((chapter) => {
              const Icon = ICONS[chapter.icon] ?? PiCode;
              return (
                <li key={chapter.title}>
                  <span className="bento__node" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <p className="bento__when">{chapter.when}</p>
                    <h3>{chapter.title}</h3>
                    <p className="bento__small">{chapter.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </article>

        <article className="bento__tile bento__tile--stack" data-reveal>
          <p className="bento__label">
            <PiCode aria-hidden="true" /> core stack
          </p>
          <ul className="bento__logos">
            {CORE.map((name) => (
              <li key={name} title={name}>
                <TechIcon name={name} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="bento__tile bento__tile--mres" data-reveal>
          <PiGraduationCap className="bento__icon" aria-hidden="true" />
          <p className="bento__headline">MRes AI</p>
          <p className="bento__small">Completed with Distinction</p>
        </article>

        <article className="bento__tile bento__tile--gold" data-reveal>
          <PiMedal className="bento__icon" aria-hidden="true" />
          <p className="bento__headline">Gold medal</p>
          <p className="bento__small">BS IT, 1st position · GPA 3.79</p>
        </article>

        <article className="bento__tile bento__tile--cert" data-reveal>
          <PiCertificate className="bento__icon" aria-hidden="true" />
          <p className="bento__headline">AWS Academy</p>
          <p className="bento__small">Cloud Foundations · ML for NLP</p>
        </article>

        <article className="bento__tile bento__tile--beyond" data-reveal>
          <p className="bento__label">
            <PiHeart aria-hidden="true" /> beyond the job title
          </p>
          <ul className="bento__list">
            {about.beyond.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}
