import { PiArrowUp, PiEnvelopeSimple, PiGithubLogo, PiHeartFill, PiLinkedinLogo } from "react-icons/pi";
import { profile } from "../../data/profile";
import { scrollToSection } from "../../lib/scroll";
import "./Footer.css";

const MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}`;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <p className="footer__made hand">
          Made with <PiHeartFill className="footer__heart" aria-label="love" role="img" /> by {profile.firstName}
        </p>

        <button type="button" className="footer__top" onClick={() => scrollToSection("top")} data-cursor="Back to the top">
          <PiArrowUp aria-hidden="true" />
          <span className="visually-hidden">Back to the top</span>
        </button>

        <ul className="footer__links">
          <li>
            <a href={MAILTO} aria-label={`Email ${profile.email}`}>
              <PiEnvelopeSimple aria-hidden="true" />
              <span>{profile.email}</span>
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              <PiLinkedinLogo aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
              <PiGithubLogo aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
