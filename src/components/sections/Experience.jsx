import { useId, useLayoutEffect, useRef, useState } from "react";
import { PiCaretDown, PiChalkboardTeacher, PiCloud, PiCode, PiDeviceMobile, PiMicrophoneStage, PiPlugs, PiShieldCheck, PiSparkle, PiUser } from "react-icons/pi";
import { SiWordpress } from "react-icons/si";
import Section from "../layout/Section";
import Doodle from "../doodles/Doodle";
import { TechIcon } from "../../lib/techIcons";
import { gsap, MOTION_OK, prefersReducedMotion, ScrollTrigger } from "../../lib/gsap";
import { experience } from "../../data/experience";
import "./Experience.css";

const ICONS = {
  mobile: PiDeviceMobile,
  solo: PiUser,
  shield: PiShieldCheck,
  cloud: PiCloud,
  code: PiCode,
  plug: PiPlugs,
  wordpress: SiWordpress,
  spark: PiSparkle,
  talk: PiMicrophoneStage,
  school: PiChalkboardTeacher,
};

export default function Experience() {
  const listRef = useRef(null);
  const fillRef = useRef(null);

  // The thread down the side fills as you read.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: listRef.current, start: "top 65%", end: "bottom 65%", scrub: 0.4 },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <Section id="experience" title="Experience" kicker="almost five years in production, and giving back" tone="grey">
      <ol ref={listRef} className="timeline">
        <li className="timeline__rail" aria-hidden="true">
          <span ref={fillRef} className="timeline__fill" />
        </li>

        {experience.map((job) => (
          <li key={job.company} className="timeline__item" data-reveal>
            <Role job={job} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Role({ job }) {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef(null);
  const detailsId = useId();

  // Opens and closes the full detail with a smooth height change.
  const toggle = () => {
    const panel = detailsRef.current;
    const next = !open;
    setOpen(next);
    if (prefersReducedMotion()) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }
    if (next) {
      gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.6, ease: "expo.out", onComplete: () => ScrollTrigger.refresh() });
    } else {
      gsap.to(panel, { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut", onComplete: () => ScrollTrigger.refresh() });
    }
  };

  return (
    <article className="role">
      {job.margin && (
        <p className="role__margin hand" aria-hidden="true">
          <Doodle shape="heart" className="role__heart" />
          {job.margin}
        </p>
      )}

      <header className="role__header">
        <div>
          <h3>{job.role}</h3>
          <p className="role__company">{job.company}</p>
        </div>
        <div className="role__when">
          <p className="role__period">{job.period}</p>
          <p className="role__location">{job.location}</p>
        </div>
      </header>

      <p className="role__summary">{job.summary}</p>

      <ul className="role__mains">
        {job.mains.map((main) => {
          const Icon = ICONS[main.icon] ?? PiCode;
          return (
            <li key={main.text}>
              <span className="role__main-icon" aria-hidden="true">
                <Icon />
              </span>
              {main.text}
            </li>
          );
        })}
      </ul>

      <div className="role__foot">
        <ul className="role__stack" aria-label={`Technologies used at ${job.company}`}>
          {job.stack.map((item) => (
            <li key={item} title={item}>
              <TechIcon name={item} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button type="button" className="role__toggle" aria-expanded={open} aria-controls={detailsId} onClick={toggle}>
          {open ? "Show less" : "Everything I did here"}
          <PiCaretDown aria-hidden="true" />
        </button>
      </div>

      <div ref={detailsRef} id={detailsId} className="role__details" data-open={open}>
        {job.note && <p className="role__note">{job.note}</p>}
        <div className="role__groups">
          {job.groups.map((group) => (
            <div key={group.title}>
              <h4 className="hand">{group.title}</h4>
              <ul>
                {group.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
