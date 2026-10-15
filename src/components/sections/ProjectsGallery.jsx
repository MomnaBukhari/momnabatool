import { useLayoutEffect, useRef } from "react";
import { PiArrowRight, PiGithubLogo, PiPlus } from "react-icons/pi";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { scrollToY } from "../../lib/scroll";
import { projects } from "../../projects";
import { profile } from "../../data/profile";
import useTilt from "../../hooks/useTilt";
import { TransitionLink } from "../layout/PageTransition";
import ProjectArt from "../projects/ProjectArt";
import TagList from "../ui/TagList";
import "./ProjectsGallery.css";

/**
 * Projects scroll sideways. On large screens the section pins and vertical
 * scrolling moves the row; on phones (or with reduced motion) it is a normal
 * swipeable row. The bar underneath shows progress and can be dragged.
 */
export default function ProjectsGallery() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const thumbRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const setThumb = (progress) => gsap.set(thumb, { xPercent: progress * (100 / thumbRatio() - 100) });
    const thumbRatio = () => Math.min(1, track.parentElement.clientWidth / track.scrollWidth);

    const sizeThumb = () => gsap.set(thumb, { width: `${thumbRatio() * 100}%` });
    sizeThumb();

    const mm = gsap.matchMedia();

    mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: sizeThumb,
          onUpdate: (self) => setThumb(self.progress),
        },
      });
      triggerRef.current = tween.scrollTrigger;
      return () => {
        triggerRef.current = null;
      };
    });

    // Without pinning, the row scrolls natively; keep the bar in step with it.
    const onScroll = () => {
      if (triggerRef.current) return;
      const max = track.scrollWidth - track.clientWidth;
      setThumb(max > 0 ? track.scrollLeft / max : 0);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sizeThumb);

    return () => {
      mm.revert();
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sizeThumb);
    };
  }, []);

  // Jump to a fraction (0–1) of the row: used by the bar and by keyboard focus.
  const goTo = (fraction, smooth = true) => {
    const clamped = Math.min(1, Math.max(0, fraction));
    const trigger = triggerRef.current;
    if (trigger) scrollToY(trigger.start + (trigger.end - trigger.start) * clamped, smooth);
    else {
      const track = trackRef.current;
      track.scrollTo({ left: (track.scrollWidth - track.clientWidth) * clamped, behavior: smooth ? "smooth" : "auto" });
    }
  };

  const onBarPointer = (event) => {
    const bar = barRef.current;
    const move = (e) => {
      const rect = bar.getBoundingClientRect();
      goTo((e.clientX - rect.left) / rect.width, false);
    };
    move(event);
    bar.setPointerCapture(event.pointerId);
    bar.addEventListener("pointermove", move);
    bar.addEventListener("pointerup", () => bar.removeEventListener("pointermove", move), { once: true });
  };

  // When a card gets keyboard focus while pinned, scroll so it is on screen.
  const onCardFocus = (event) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const card = event.currentTarget;
    const track = trackRef.current;
    const distance = track.scrollWidth - window.innerWidth;
    const target = card.offsetLeft - (window.innerWidth - card.offsetWidth) / 2;
    goTo(target / distance);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="gallery"
      aria-labelledby="projects-heading"
    >
      <div ref={pinRef} className="gallery__pin">
        <div ref={trackRef} className="gallery__track" data-cursor-zone="drag">
          <div className="gallery__intro">
            <h2 id="projects-heading" tabIndex={-1}>
              Projects <span className="hand">built for real people</span>
            </h2>
            <p className="gallery__lede">
              Professional work first, then academic and personal builds. Each one has its own page.
            </p>
            <p className="gallery__hint">
              <span className="hand">keep scrolling, they slide sideways</span> <PiArrowRight aria-hidden="true" />
            </p>
          </div>

          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              total={projects.length}
              onFocus={onCardFocus}
            />
          ))}

          <div className="gallery__end">
            <p>More small experiments live on GitHub.</p>
            <a className="link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              <PiGithubLogo aria-hidden="true" /> See my GitHub
            </a>
          </div>
        </div>

        <div className="container">
          <div
            ref={barRef}
            className="gallery__bar"
            role="presentation"
            onPointerDown={onBarPointer}
            data-cursor="Drag"
          >
            <span ref={thumbRef} className="gallery__thumb" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total, onFocus }) {
  const cardRef = useRef(null);
  useTilt(cardRef, { max: 7 });
  const number = (n) => String(n).padStart(2, "0");

  return (
    <article ref={cardRef} className="pcard" onFocus={onFocus}>
      <TransitionLink
        to={`/projects/${project.slug}`}
        label={project.title}
        className="pcard__link"
        data-cursor="View project"
      >
        <div className="pcard__text">
          <p className="pcard__eyebrow">
            {project.type} <span aria-hidden="true">/</span> {project.period}
          </p>
          <h3>{project.title}</h3>
          <p className="pcard__tagline">{project.tagline}</p>
        </div>
        <div className="pcard__art">
          <ProjectArt seed={project.slug} monogram={project.cover ? null : project.title[0]} />
          {project.cover && (
            <img
              className="pcard__shot"
              src={project.cover.src}
              alt=""
              width={project.cover.width}
              height={project.cover.height}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <div className="pcard__foot">
          <TagList items={project.stack.slice(0, 3)} label={`Technologies used in ${project.title}`} />
          <span className="pcard__plus" aria-hidden="true">
            <PiPlus />
          </span>
          <span className="visually-hidden">
            Project {number(index + 1)} of {number(total)}
          </span>
        </div>
        <span className="pcard__shine" aria-hidden="true" />
      </TransitionLink>
    </article>
  );
}
