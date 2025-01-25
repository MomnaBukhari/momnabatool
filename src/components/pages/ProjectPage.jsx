import { Helmet } from "react-helmet";
import "../../styling/projectpage.css";

// eslint-disable-next-line react/prop-types
function ProjectPage({ limit }) {
  const projects = [
    {
      title: "Parfumèlle - Perfume Store",
      image: "/images/defaultprojectimage.png",
      technologies: "React, GSAP",
      date: "January 2025",
      websiteUrl: "https://perfumelle.netlify.app/",
      githubUrl: "https://github.com/MomnaBukhari/Perfume-Shop/",
    },
    {
      title: "Study Sphere - Educational System",
      image: "/images/defaultprojectimage.png",
      technologies: "Laravel, pHp",
      date: "2023 - 2024",
      websiteUrl: "",
      githubUrl: "https://github.com/MomnaBukhari/StudySphere---All-In-One-Educational-System",
    },
    {
      title: "Muslim Match Making System",
      image: "/images/Project3.png",
      technologies: "Contributed as Backend Developer",
      date: "2023 - 2024",
      websiteUrl: "https://muslim-matchmakers.com/",
      githubUrl: "",
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
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <h3>{project.title}</h3>
              <div className="project-details">
                <div className="technologies">
                  <p>
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                </div>
                <div className="project-meta">
                  <div className="links">
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Preview
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                  {project.date && (
                    <div className="date">
                      <p>
                        <strong>Date:</strong> {project.date}
                      </p>
                    </div>
                  )}
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