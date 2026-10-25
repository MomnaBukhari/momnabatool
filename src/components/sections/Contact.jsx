import { useState } from "react";
import { PiCheck, PiCopy, PiEnvelopeSimple, PiGithubLogo, PiLinkedinLogo, PiMapPin, PiPaperPlaneTilt } from "react-icons/pi";
import Section from "../layout/Section";
import Doodle from "../doodles/Doodle";
import { profile } from "../../data/profile";
import "./Contact.css";

// Opens the visitor's own email app with a friendly subject already filled in.
const MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}`;

/**
 * Contact: no form to fail. An envelope that opens your email app, the
 * address to copy, and the places to find me.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = MAILTO;
    }
  };

  return (
    <Section id="contact" title="Let's talk" kicker="a letter is only a click away" tone="grey">
      <div className="contact">
        <a className="envelope" href={MAILTO} data-reveal data-cursor="Write to me">
          <span className="envelope__letter" aria-hidden="true">
            <span className="hand">Dear Momna,</span>
            <span className="envelope__lines" />
          </span>
          <span className="envelope__body" aria-hidden="true">
            <span className="envelope__stamp">
              <Doodle shape="flower" className="envelope__flower" />
            </span>
            <span className="envelope__to hand">
              {profile.name}
              <br />
              {profile.location}
            </span>
          </span>
          <span className="envelope__flap" aria-hidden="true" />
          <span className="envelope__seal" aria-hidden="true">
            {profile.firstName[0]}
          </span>
          <span className="visually-hidden">Write me an email</span>
        </a>

        <div className="contact__side" data-reveal>
          <p className="contact__lead">
            The quickest way to reach me is email. Click the envelope, or the button below, and your
            email app opens with my address ready.
          </p>

          <div className="contact__actions">
            <a className="button glitter" href={MAILTO}>
              <PiPaperPlaneTilt aria-hidden="true" /> Write me an email
            </a>
            <button type="button" className="contact__copy" onClick={copy} aria-live="polite">
              {copied ? <PiCheck aria-hidden="true" /> : <PiCopy aria-hidden="true" />}
              {copied ? "Copied" : "Copy my address"}
            </button>
          </div>

          <ul className="contact__direct">
            <li>
              <PiEnvelopeSimple aria-hidden="true" />
              <a className="link" href={MAILTO}>
                {profile.email}
              </a>
            </li>
            <li>
              <PiLinkedinLogo aria-hidden="true" />
              <a className="link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <PiGithubLogo aria-hidden="true" />
              <a className="link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <PiMapPin aria-hidden="true" />
              <span>{profile.location}</span>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
