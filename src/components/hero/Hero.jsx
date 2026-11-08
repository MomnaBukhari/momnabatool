import { useLayoutEffect, useRef } from "react";
import { PiArrowRight, PiFileText } from "react-icons/pi";
import { TransitionLink } from "../layout/PageTransition";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { scrollToSection } from "../../lib/scroll";
import { profile } from "../../data/profile";
import Button from "../ui/Button";
import WaveText from "../ui/WaveText";
import Doodle from "../doodles/Doodle";
import ApiConsole from "./ApiConsole";
import WordRotator from "./WordRotator";
import "./ApiConsole.css";
import HeroScene from "./HeroScene";
import SkillTicker from "./SkillTicker";
import "./Hero.css";

// The strip under the hero: the tools I reach for, backend first, then the rest.
// Every name here gets its logo from src/lib/techIcons.jsx.
const STACK = [
  "PHP",
  "Laravel",
  "MySQL",
  "REST API design",
  "Laravel Blade",
  "WordPress",
  "AWS Lambda integration",
  "Amazon S3",
  "JavaScript",
  "React",
  "HTML",
  "CSS",
  "GSAP",
  "Python",
  "Git",
  "GitHub",
  "GitLab",
  "Postman",
  "PhpStorm",
  "VS Code",
  "Figma",
  "Canva",
  "ibisPaint X",
];

export default function Hero() {
  const rootRef = useRef(null);
  const copyRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const copy = copyRef.current;

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
        .from(rootRef.current.querySelector(".ticker"), { opacity: 0, y: 10, duration: 1 }, 0.9);

      const play = () => intro.play();
      if (window.__introDone) play();
      else window.addEventListener("intro:done", play, { once: true });

      // Scrolling away: the words lift and fade.
      gsap.to(copy, {
        y: -60,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      return () => window.removeEventListener("intro:done", play);
    });

    return () => mm.revert();
  }, []);

  return (
    <header ref={rootRef} className="hero" id="top">
      <HeroScene />
      <div className="container hero__grid">
        <div ref={copyRef} className="hero__copy">
          <p className="hero__hello hand glitter" data-hero-follow>
            Hello, I&apos;m
            <Doodle shape="sparkle" className="hero__sparkle" onLoad delay={1.1} />
          </p>

          <h1 className="hero__title">
            <WaveText text={profile.name} className="hero__line" />
            <span className="visually-hidden">, {profile.role}</span>
          </h1>
          <Doodle shape="underline" className="hero__underline" onLoad delay={0.7} />

          <p className="hero__role" data-hero-follow>
            Software Engineer <span className="hero__role-sep" aria-hidden="true">/</span>{" "}
            <span className="hero__role-soft">I build</span>{" "}
            <WordRotator words={["REST APIs", "data models", "secure auth flows", "background jobs", "products people use"]} />
          </p>
          <p className="hero__sub" data-hero-follow>
            I design and build the backend of web and mobile products with <strong>PHP, Laravel and MySQL</strong>,
            and I&apos;m at home on the frontend too.
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
            <TransitionLink to={profile.cv} label="Statement & CV" className="hero__cv" data-cursor="My story and CV">
              Read my statement &amp; CV <PiFileText aria-hidden="true" />
            </TransitionLink>
          </div>
        </div>

        <div className="hero__console" data-hero-follow>
          <ApiConsole />
          <p className="hero__console-hint hand">psst, click an endpoint ↑</p>
        </div>
      </div>

      <SkillTicker items={STACK} />
    </header>
  );
}
