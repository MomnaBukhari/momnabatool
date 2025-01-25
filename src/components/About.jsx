import React from "react";
import { Helmet } from "react-helmet";
import { FaGithub, FaCode, FaTools, FaLaptopCode, FaStickyNote } from "react-icons/fa";
import "../styling/About.css";

function About() {
  return (
    <>
      <Helmet>
        <title>About Momna</title>
      </Helmet>
      <div className="about-page">
        {/* Your Passage */}
        <div className="about-section">
          <p>
            Console.log("Hello World! With a Dream to Serve in the World of
            Innovation as a Web Engineer");
            <br></br>
            <br></br> I’m a Creative Developer driven by a passion for turning
            innovative ideas into reality. I believe in coding as an art – where
            creativity and logic comes together to craft masterpieces that make a
            real difference. As a lifelong learner in the field of Information
            Technology, I find great excitement in technology and am consistently
            amazed by its transformative impact on the world.
            <br></br>
            <br></br>
            I have been into this field since 2020, and throughout my
            academic journey, I have developed a strong foundation in various
            concepts like Object Oriented Programming, Data Structures and
            Algorithms (C++), Database Management (SQL), Project Management, Web
            Technologies and more. I’ve Spent more than 262800 minutes diving into
            the Core concepts of Software engineering from requirement analysis to
            deploying products. My passion for being web engineer ignited during
            last year of my bachelor’s era when I developed a comprehensive Web
            based Education System “StudySphere”, which was developed to fill the
            gaps in existing systems. 
            <br></br>
            <br></br>
            After graduating in 2024 (with a gold
            medal!), I’ve been deepening my expertise by working on real-world
            projects. I’m now expanding my skill set by learning the whole MERN
            stack to enhance my ability to build fully integrated, end-to-end web
            applications with JavaScript across both the client and server sides.
            Moreover, I’m a firm believer in the Agile methodology and support its
            iterative, collaborative approach. Despite any skill gaps, my
            determination to learn compensates for them.
            <br></br>
            <br></br>Beyond the world of technology, I am an avid tea buff and
            find myself drawn to the captivating world of Graphic Arts. In my free
            time, I like to color this world from my pallet and do web surfing,
            collecting books and writing notes and yes! exploring ideas to
            developer later.
          </p>
        </div>

        {/* GitHub Contribution Chart */}
        <div className="github-chart">
          <h2>My GitHub Contributions</h2>
          <img
            src="https://ghchart.rshah.org/momnabukhari"
            alt="Momna's GitHub Contributions"
            className="github-chart-img"
          />
        </div>

        {/* Experience Section */}
        <div className="experience-section">
          <h2>Experience</h2>
          <div className="experience-item">
            <h3>Internship</h3>
            <p className="experience-duration">March 2024 - June 2024</p>
            <p className="experience-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="experience-item">
            <h3>Backend Developer at Rev 9 Solutions</h3>
            <p className="experience-duration">June 2024 - Present</p>
            <p className="experience-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Favorite Tools Section */}
        <div className="tools-section">
          <h2>My Favorite Tools</h2>
          <div className="tools-category">
            <h3><FaCode /> Development</h3>
            <div className="tools-list">
              <div className="tool">
                <FaLaptopCode />
                <span>VS Code</span>
              </div>
              <div className="tool">
                <FaCode />
                <span>GitHub</span>
              </div>
            </div>
          </div>
          <div className="tools-category">
            <h3><FaStickyNote /> Productivity</h3>
            <div className="tools-list">
              <div className="tool">
                <FaStickyNote />
                <span>Notion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;