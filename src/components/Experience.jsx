import React from "react";
import "../styling/Experience.css";

const Experience = () => {
  const experiences = [
    {
      title: "Backend Developer",
      company: "Rev9 Solutions",
      url: "https://www.rev9solutions.com", // Add URL for the company
      date: "August 2024 - Present",
      description: "Worked on developing scalable web applications using React and Node.js.",
    },
    {
      title: "Internship | Backend Developer",
      company: "Rev9 Solutions",
      url: "https://www.rev9solutions.com", // Add URL for the company
      date: "March 2024 - July 2024",
      description: "Worked on developing scalable web applications using React and Node.js.",
    }
  ];

  return (
    <div className="experience-page">
      <h1>Experience</h1>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="dot"></div>
            <div className="timeline-content">
              <h3>{exp.title}</h3>
              {exp.url ? (
                <h4>
                  <a href={exp.url} target="_blank" rel="noopener noreferrer">
                    {exp.company}
                  </a>
                </h4>
              ) : (
                <h4>{exp.company}</h4>
              )}
              <p>{exp.date}</p>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
