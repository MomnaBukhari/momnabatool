import { useState, useEffect } from "react";
import gsap from "gsap";
import Loader from "./blocks/Loader.jsx";
import Projects from "./pages/ProjectPage.jsx";
import "./../styling/Home.css";
import { Helmet } from "react-helmet";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaderComplete = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (isLoaded) {
      gsap.fromTo(
        ".home-page",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }
  }, [isLoaded]);

  useEffect(() => {
    setTimeout(handleLoaderComplete, 3000);
  }, []);

  return (
    <>
      <Helmet>
        <title>Momna ♡˚🦢✧</title>
      </Helmet>
      {!isLoaded ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="home-page">
            <div className="hero-section">
              <h1>Momna Batool</h1>
              <h2>Creative Full Stack Developer</h2>
              <p>I do ART | People call it Web Development.</p>
            </div>
            <div className="cv-butons">
              <a
                href="/documents/syedamomnabatool.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="preview-cv-button"
              >
                Preview CV
                <img src="./public/icons/preview0.png"></img>
              </a>
              <a
                href="/documents/syedamomnabatool.pdf"
                download
                className="download-cv-button"
              >
                Download CV
                <img src="./public/icons/download0.png"></img>
              </a>
            </div>
            <div className="project-display-section">
              <div className="project-display-content">
                <h2>Projects</h2>
                <Projects limit={4} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
