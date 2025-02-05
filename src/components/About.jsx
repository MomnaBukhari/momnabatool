import { Helmet } from "react-helmet";
import {
  FaRegSquare,
  FaArrowRight,
  FaGithub,
  FaCode,
  FaTools,
  FaLaptopCode,
  FaStickyNote,
} from "react-icons/fa";
import "../styling/About.css";

function About() {
  return (
    <>
      <Helmet>
        <title>About Momna</title>
      </Helmet>
      <div className="about-page">
        <div className="about-page-1">
          <div className="about-page-1-1">
            <img src="/images/personalityimage.png"></img>
          </div>
          <div className="about-page-1-2">
            <h2>
              Know who <span className="about-page-1-2-span">I&apos;M</span>
            </h2>
            <p>
              Hey I am Momna! :) , a creative software developer from Pakistan.
              I graduated in 2024 earning a Degree of Bachelors in Information
              Technology. I was awarded with a Gold Medal for standing 1st in my
              Academic Session and a Roll of Honors for performing best.
              <br />
              Currently, I am working as a Backend Developer at a Software house
              known as <span>Rev9 Solutions</span>.
              <br />
              Besides, I am looking forward to continuing my studies further. So
              excited for it already!
              <br />
              <br />
              Apart from coding, I do love to do other stuff like:
              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <FaArrowRight style={{ marginRight: "8px" }} />I practice
                  React to design the interfaces of systems that I build.
                </li>
                <li>
                  <FaArrowRight style={{ marginRight: "8px" }} />I do web
                  surfing and stay updated with new trends in the tech field.
                </li>
                <li>
                  <FaArrowRight style={{ marginRight: "8px" }} />
                  Oh yes, one more thing! I love to draw Fashion Illustrations.
                  Here see my drawings
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    click here
                  </a>
                  .
                </li>
              </ul>
            </p>
          </div>
        </div>
        <div className="about-page-2">
          <div className="about-page-2-1">
            <h1>
              Professional <span className="about-page-1-2-span">Skillset</span>
            </h1>
          </div>
          <div className="about-page-2-2">
            <div className="skill-category">
              <h3>Programming</h3>
              <div className="skill-grid">
                <div className="skill-box">
                  <FaRegSquare /> C++
                </div>
                <div className="skill-box">
                  <FaRegSquare /> PHP
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Scripting</h3>
              <div className="skill-grid">
                <div className="skill-box">
                  <FaRegSquare /> HTML
                </div>
                <div className="skill-box">
                  <FaRegSquare /> CSS
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Front-end Libraries</h3>
              <div className="skill-grid">
                <div className="skill-box">
                  <FaRegSquare /> Bootstrap
                </div>
                <div className="skill-box">
                  <FaRegSquare /> GSAP
                </div>
                <div className="skill-box">
                  <FaRegSquare /> React
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Backend Framework</h3>
              <div className="skill-grid">
                <div className="skill-box">
                  <FaRegSquare /> Laravel
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Database</h3>
              <div className="skill-grid">
                <div className="skill-box">
                  <FaRegSquare /> MySQL
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Core Concepts</h3>
              <div className="skill-grid">
                <div className="skill-box">
                  <FaRegSquare /> OOP
                </div>
                <div className="skill-box">
                  <FaRegSquare /> Data Structures
                </div>
                <div className="skill-box">
                  <FaRegSquare /> Software Engineering
                </div>
                <div className="skill-box">
                  <FaRegSquare /> AI & ML
                </div>
              </div>
            </div>

            <div className="skill-category learning">
              <h3>Currently Learning</h3>
              <div className="skill-grid">
                <div className="skill-box">
                  <FaRegSquare /> React
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-page-3">
          <div className="about-page-3-1">
            <h1>
              Some <span className="about-page-1-2-span">Tools</span> that I use
            </h1>
          </div>
          <div className="about-page-3-2">
            <div className="about-page-3-2-1 about-page-3-2-tool"> GitHub </div>
            <div className="about-page-3-2-2 about-page-3-2-tool"> Slack </div>
            <div className="about-page-3-2-3 about-page-3-2-tool">VS Code</div>
            <div className="about-page-3-2-4 about-page-3-2-tool">
              Php Storm
            </div>
            <div className="about-page-3-2-5 about-page-3-2-tool">Balsamiq</div>
            <div className="about-page-3-2-6 about-page-3-2-tool">Notion</div>
          </div>
        </div>
        <div className="about-page-4">
          <div className="github-chart">
            <h2>
              Days I <span className="about-page-1-2-span">Code</span>
            </h2>
            <img
              src="https://ghchart.rshah.org/momnabukhari"
              alt="Momna's GitHub Contributions"
              className="github-chart-img"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
