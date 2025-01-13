import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "../styling/Navbar.css";
import RoutesComponent from "./Routes";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="top-navbar ">
          <div className="top-navbar-left logo">
            <Link to="/">Code by Momna</Link>
          </div>
          <div className="top-navbar-right">
            <Link to="/about">About</Link>
            <Link to="/experience">Experience</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="left-navbar ">
          <a
            href="https://www.linkedin.com/in/momna-batool/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/MomnaBukhari" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
