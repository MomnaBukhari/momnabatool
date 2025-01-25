import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaBars, FaTimes } from "react-icons/fa";
import "../styling/Navbar.css";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  // Toggle music play/pause
  const toggleMusic = () => {
    const audio = document.getElementById("background-music");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left logo">
          <a href="/">Code by Momna</a>
        </div>
        <div className="navbar-center">
          <Link to="/about">About</Link>
          {/* <Link to="/experience">Experience</Link> */}
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="navbar-right">
          {/* Fullscreen Button */}
          <button className="icon-btn" onClick={toggleFullscreen}>
            <img
              src={
                isFullscreen
                  ? "https://img.icons8.com/?size=100&id=37959&format=png&color=000000"
                  : "https://img.icons8.com/?size=100&id=38033&format=png&color=000000"
              }
              alt="Fullscreen"
            />
          </button>

          {/* Music Play/Pause Button */}
          <button className="icon-btn" onClick={toggleMusic}>
            <img
              src={
                isPlaying
                  ? "https://img.icons8.com/?size=100&id=24890&format=png&color=000000"
                  : "https://img.icons8.com/?size=100&id=25603&format=png&color=000000"
              }
              alt="Music"
            />
          </button>
        </div>
        <div className="navbar-toggle">
          <FaBars size={24} onClick={toggleSidebar} />
        </div>
      </div>

      {isSidebarOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <FaTimes size={24} onClick={toggleSidebar} />
          </div>
          <div className="sidebar-links">
            <Link to="/about" onClick={toggleSidebar}>
              About
            </Link>
            {/* <Link to="/experience" onClick={toggleSidebar}>
              Experience
            </Link> */}
            <Link to="/projects" onClick={toggleSidebar}>
              Projects
            </Link>
            <Link to="/contact" onClick={toggleSidebar}>
              Contact
            </Link>
            <div className="sidebar-icons">
              <a
                href="https://www.linkedin.com/in/momna-batool/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/MomnaBukhari"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Audio element for background music */}
      <audio id="background-music" src="/audio/background.mp3" loop />
    </>
  );
}

export default Navbar;