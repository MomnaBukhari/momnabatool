import { useLayoutEffect, useRef } from "react";
import { PiArrowRight, PiDownloadSimple } from "react-icons/pi";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { scrollToSection } from "../../lib/scroll";
import { TechIcon } from "../../lib/techIcons";
import { profile } from "../../data/profile";
import { skills } from "../../data/skills";
import Button from "../ui/Button";
import WaveText from "../ui/WaveText";
import Doodle from "../doodles/Doodle";
import CodeWindow from "./CodeWindow";
import "./Hero.css";

// The strip under the hero: the everyday stack, straight from the skills data.
const STACK = [
  ...skills[0].items,
  ...skills[2].items.slice(0, 1),
  ...skills[3].items.slice(3),
  "Git",
  "Postman",
];

export default function Hero() {
  const rootRef = useRef(null);
  const copyRef = useRef(null);
  const deskRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const copy = copyRef.current;
      const desk = deskRef.current;

      // Everything waits, hidden, until the hello screen lifts.
      const intro = gsap
        .timeline({ paused: true })
        .from(copy.querySelectorAll(".hero__line"), {
          yPercent: 60,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
        })
        .from(copy.querySelectorAll("[data-hero-follow]"), { y: 18, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 }, "-=0.8")
        .from(desk.querySelector(".code-window"), { y: 60, rotate: 4, opacity: 0, duration: 1.2, ease: "expo.out" }, 0.2)
        .from(desk.querySelector(".hero__note"), { y: -80, rotate: -20, opacity: 0, duration: 1, ease: "back.out(1.6)" }, 0.65)
        .from(desk.querySelector(".hero__aside"), { opacity: 0, duration: 0.8 }, 1.1)
        .from(rootRef.current.querySelector(".hero__stack"), { opacity: 0, duration: 1 }, 0.9);

      const play = () => intro.play();
      if (window.__introDone) play();
      else window.addEventListener("intro:done", play, { once: true });

      // Scrolling away: the words lift and fade, the desk drifts a little slower.
      gsap
        .timeline({ scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 0.6 } })
        .to(copy, { y: -70, opacity: 0.2, ease: "none" }, 0)
        .to(desk, { y: -30, ease: "none" }, 0);

      return () => window.removeEventListener("intro:done", play);
    });

    return () => mm.revert();
  }, []);

  return (
    <header ref={rootRef} className="hero graph-paper" id="top">
      <div className="container hero__grid">
        <div ref={copyRef} className="hero__copy">
          <p className="hero__hello hand" data-hero-follow>
            Hello, I&apos;m
            <Doodle shape="sparkle" className="hero__sparkle" onLoad delay={1.1} />
          </p>

          <h1 className="hero__title">
            <WaveText text={profile.name} className="hero__line" />
            <span className="visually-hidden">, {profile.role}</span>
          </h1>
          <Doodle shape="underline" className="hero__underline" onLoad delay={0.7} />

          <p className="hero__sub" data-hero-follow>
            A software engineer who builds the backend. <strong>PHP, Laravel and MySQL</strong>, in
            production for almost five years.
          </p>

          <div className="hero__actions" data-hero-follow>
            <Button
              href="#projects"
              icon={<PiArrowRight />}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("projects");
              }}
            >
              See my work
            </Button>
            <a className="hero__cv" href={profile.cv} download data-cursor="Download my CV">
              Download CV <PiDownloadSimple aria-hidden="true" />
            </a>
          </div>
        </div>

        <div ref={deskRef} className="hero__desk">
          <CodeWindow />

          <div className="hero__note sticky-note" data-cursor-grow>
            <span className="tape" aria-hidden="true" />
            <p className="hand">
              <span className="hero__pulse" aria-hidden="true" />
              Open to software engineering roles
            </p>
            <p className="hand hero__note-small">UK and remote</p>
          </div>

          <p className="hero__aside hand" aria-hidden="true">
            <Doodle shape="arrowDown" className="hero__aside-arrow" onLoad delay={1.6} />
            the kind of thing I write all day
          </p>
        </div>
      </div>

      <div className="hero__stack">
        <ul className="hero__stack-track" aria-label="Everyday stack">
          {[...STACK, ...STACK].map((item, index) => (
            <li key={`${item}-${index}`} aria-hidden={index >= STACK.length || undefined}>
              <TechIcon name={item} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
