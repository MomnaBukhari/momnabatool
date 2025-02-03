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
            <img src="./images/char1.png"></img>
            <h1>
              Hey! Sorry, Can you please switch to a Bigger Screen or Desktop
              View?
            </h1>
            <p>
              Well, Smaller screen view development is in progress. <br></br>{" "}
              Thank you for your patience!
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
