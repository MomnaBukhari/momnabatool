import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Loader from "./blocks/Loader.jsx";
import Projects from "./pages/ProjectPage.jsx";
import RecommendationsPage from "./Recommendation";
import "./../styling/Home.css";
import { Helmet } from "react-helmet";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const textRef = useRef(null);

  const textList = [
    "Creative Web Developer",
    "Agile Practitioner",
    "Illustrator",
    "Free time - Visionary Fashion Designer",
  ];

  useEffect(() => {
    const typeText = async (text, element) => {
      for (let i = 0; i <= text.length; i++) {
        element.innerHTML = text.slice(0, i) + "<span class='cursor'>|</span>";
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    const deleteText = async (element) => {
      const text = element.innerText;
      for (let i = text.length; i >= 0; i--) {
        element.innerHTML = text.slice(0, i) + "<span class='cursor'>|</span>";
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    };

    const animateText = async () => {
      const element = textRef.current;
      if (!element) return;

      for (let i = 0; ; i = (i + 1) % textList.length) {
        await typeText(textList[i], element);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Pause
        await deleteText(element);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause
      }
    };

    if (isLoaded) {
      animateText();
    }
  }, [isLoaded]);

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
              <h1>Syeda Momna Batool</h1>
              {/* Add the text-changing animation here */}
              <div className="hero-section-3">
                <p ref={textRef}></p>
              </div>
            </div>
            <div className="cv-butons">
              <a
                href="/documents/syedamomnabatool.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="preview-cv-button"
              >
                Preview CV
                <img src="https://img.icons8.com/?size=100&id=5252&format=png&color=000000"></img>
              </a>
              <a
                href="/documents/syedamomnabatool.pdf"
                download
                className="download-cv-button"
              >
                Download CV
                <img src="https://img.icons8.com/?size=100&id=56389&format=png&color=000000"></img>
              </a>
            </div>
            <div className="project-display-section">
              <div className="project-display-content">
                <h2>Projects</h2>
                <Projects limit={4} />
              </div>
            </div>
            <div className="Recommendations">
              <section className="home-recommendations">
                <RecommendationsPage limit={2} />
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;