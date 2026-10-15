import { useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { PiArrowLeft, PiArrowRight, PiArrowUpRight, PiGithubLogo } from "react-icons/pi";
import { getNextProject, getProject, projects } from "../projects";
import { gsap, MOTION_OK } from "../lib/gsap";
import usePageTitle from "../hooks/usePageTitle";
import { TransitionLink } from "../components/layout/PageTransition";
import ProjectArt from "../components/projects/ProjectArt";
import Button from "../components/ui/Button";
import TagList from "../components/ui/TagList";
import WaveText from "../components/ui/WaveText";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const next = project ? getNextProject(slug) : projects[0];
  const rootRef = useRef(null);
  usePageTitle(project ? project.title : "Project not found");

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(rootRef.current.querySelectorAll("[data-enter]"), {
        opacity: 0,
        y: 48,
        duration: 1.3,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.35,
      });
    });
    return () => mm.revert();
  }, [slug]);

  if (!project) {
    return (
      <main id="main" ref={rootRef} tabIndex={-1} className="project-page container">
        <h1 className="project-page__title">That project wandered off.</h1>
        <p className="project-page__tagline">It isn&apos;t here, but the rest of my work is.</p>
        <p>
          <TransitionLink to="/#projects" label="Projects" className="link">
            See all projects
          </TransitionLink>
        </p>
      </main>
    );
  }

  const position = projects.indexOf(project) + 1;
  const facts = [
    { term: "My role", detail: project.role },
    { term: "Where", detail: project.context },
    { term: "When", detail: project.period },
    { term: "Type", detail: project.type },
  ];

  return (
    <main id="main" ref={rootRef} tabIndex={-1} className="project-page">
      <div className="container">
        <TransitionLink to="/#projects" label="Projects" className="project-page__back" data-enter>
          <PiArrowLeft aria-hidden="true" /> All projects
        </TransitionLink>

        <header className="project-page__header">
          <p className="project-page__count" data-enter>
            Project {position} of {projects.length}
            {project.alsoKnownAs && <span>Also known as {project.alsoKnownAs}</span>}
          </p>
          <h1 className="project-page__title" data-enter>
            <WaveText text={project.title} />
          </h1>
          <p className="project-page__tagline" data-enter>
            {project.tagline}
          </p>
        </header>

        <dl className="project-page__facts" data-enter>
          {facts.map((fact) => (
            <div key={fact.term}>
              <dt>{fact.term}</dt>
              <dd>{fact.detail}</dd>
            </div>
          ))}
        </dl>

        <figure className="project-page__art" data-enter>
          <ProjectArt seed={project.slug} monogram={project.cover ? null : project.title[0]} />
          {project.cover && (
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              decoding="async"
            />
          )}
        </figure>

        <div className="project-page__content">
          <section className="project-page__overview" data-enter>
            <h2>Overview</h2>
            <p>{project.overview}</p>
            <TagList items={project.stack} label="Technologies used" />
            {(project.links.live || project.links.repo) && (
              <div className="project-page__links">
                {project.links.live && (
                  <Button href={project.links.live} target="_blank" rel="noopener noreferrer" icon={<PiArrowUpRight />}>
                    Visit the live site
                  </Button>
                )}
                {project.links.repo && (
                  <Button
                    href={project.links.repo}
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<PiGithubLogo />}
                  >
                    View the code
                  </Button>
                )}
              </div>
            )}
          </section>

          <section className="project-page__highlights" data-enter>
            <h2>What I built</h2>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <TransitionLink
          to={`/projects/${next.slug}`}
          label={next.title}
          className="project-page__next"
          data-cursor="Next project"
        >
          <span className="project-page__next-label">
            Next project <PiArrowRight aria-hidden="true" />
          </span>
          <span className="project-page__next-title gradient-text">{next.title}</span>
          <span className="project-page__next-tagline">{next.tagline}</span>
        </TransitionLink>
      </div>
    </main>
  );
}
