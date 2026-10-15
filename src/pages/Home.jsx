import { useEffect, useRef } from "react";
import { scrollToInitialTarget } from "../lib/scroll";
import useReveal from "../hooks/useReveal";
import usePageTitle from "../hooks/usePageTitle";
import Hero from "../components/hero/Hero";
import Highlights from "../components/sections/Highlights";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import ProjectsGallery from "../components/sections/ProjectsGallery";
import Skills from "../components/sections/Skills";
import Research from "../components/sections/Research";
import Education from "../components/sections/Education";
import Recommendations from "../components/sections/Recommendations";
import Contact from "../components/sections/Contact";

export default function Home() {
  const rootRef = useRef(null);
  usePageTitle();
  useReveal(rootRef);

  // Honour /#projects links and old URLs such as /about.
  useEffect(() => {
    scrollToInitialTarget();
  }, []);

  return (
    <main id="main" ref={rootRef} tabIndex={-1}>
      <Hero />
      <Highlights />
      <About />
      <Experience />
      <ProjectsGallery />
      <Skills />
      <Research />
      <Education />
      <Recommendations />
      <Contact />
    </main>
  );
}
