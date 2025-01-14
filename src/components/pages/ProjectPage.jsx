import React from "react";
import "../../styling/projectpage.css";
import { Helmet } from "react-helmet";

function ProjectPage({ limit }) {
  const projects = [
    {
      title: "E-commerce Website",
      image: "/images/defaultprojectimage.png",
      technologies: "React, Node.js, MongoDB",
      date: "January 2023",
      websiteUrl: "https://example.com",
      githubUrl: "https://github.com/username/ecommerce",
    },
    {
      title: "Portfolio Website",
      image: "/images/defaultprojectimage.png",
      technologies: "HTML, CSS, JavaScript",
      date: "February 2023",
      websiteUrl: "https://example.com",
      githubUrl: "https://github.com/username/portfolio",
    },
    {
      title: "Blog Platform",
      image: "/images/defaultprojectimage.png",
      technologies: "Next.js, Tailwind CSS",
      date: "March 2023",
      websiteUrl: "https://example.com",
      githubUrl: "https://github.com/username/blog",
    },
    {
      title: "Weather App",
      image: "/images/defaultprojectimage.png",
      technologies: "JavaScript, API Integration",
      date: "April 2023",
      websiteUrl: "https://example.com",
      githubUrl: "https://github.com/username/weather-app",
    },
    {
      title: "Weather App",
      image: "/images/defaultprojectimage.png",
      technologies: "JavaScript, API Integration",
      date: "April 2023",
      websiteUrl: "https://example.com",
      githubUrl: "https://github.com/username/weather-app",
    },
  ];
  const projectsToDisplay = limit ? projects.slice(0, limit) : projects;

  return (
    <>
      <Helmet>
        <title>Projects | Portfolio</title>
      </Helmet>
      <div className="project-page">
        <div className="project-grid">
          {projectsToDisplay.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-details">
                <div className="technologies">
                  <p>
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                </div>
                <div className="project-meta">
                  <div className="links">
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </div>
                  <div className="date">
                    <p>
                      <strong>Date:</strong> {project.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {limit && limit === 4 && (
          <div className="see-more">
            <a href="/projects">See More</a>
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectPage;
