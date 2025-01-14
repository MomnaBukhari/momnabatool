import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "../styling/Navbar.css";

function Navbar() {
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
      </div>
    </>
  );
}

export default Navbar;
