import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ProjectPage from './pages/ProjectPage';
import Contact from './Contact';
import Experience from './Experience';
import RecommendationsPage from "./Recommendation";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/recommendations" element={<RecommendationsPage />} />
    </Routes>
  );
}

export default RoutesComponent;
