import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesComponent from "./components/Routes";
import initializeCursor from "./scripting/cursor";
import Footer from "./components/Footer";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    initializeCursor();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <BrowserRouter>
        <div id="cursor"></div>
        {isMobile ? (
          <div className="mobile-message">
          <img src="./images/MissRi.png"></img>
          <h1>
            Hello there! This screen’s a bit too small for the full experience.
          </h1>
          <p>
            I&apos;m a backend developer — still polishing my frontend finesse 😅<br></br>
            For the best view, please switch to a desktop. Thanks for your patience and support!
          </p>
          <div className="mobile-links">
            <a
              href="https://www.linkedin.com/in/momna-batool/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/MomnaBukhari"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="mailto:smomnabatool@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
        
        ) : (
          <>
            <Navbar />
            <RoutesComponent />
            <Footer />
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
