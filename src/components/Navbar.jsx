import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaBars, FaTimes } from "react-icons/fa";
import "../styling/Navbar.css";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left logo">
          <a href="/">Code by Momna</a>
        </div>
        <div className="navbar-center">
          <Link to="/about">About</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="navbar-right">
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
            <Link to="/experience" onClick={toggleSidebar}>
              Experience
            </Link>
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
    </>
  );
}

export default Navbar;
