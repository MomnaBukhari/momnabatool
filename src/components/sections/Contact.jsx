import { useState } from "react";
import { PiEnvelopeSimple, PiGithubLogo, PiLinkedinLogo, PiMapPin, PiPaperPlaneTilt } from "react-icons/pi";
import Section from "../layout/Section";
import Button from "../ui/Button";
import { profile } from "../../data/profile";
import "./Contact.css";

export default function Contact() {
  // "idle" | "sending" | "sent" | "error"
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(profile.formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section
      id="contact"
      title="Let's talk"
      kicker="I'd love to hear about your team"
      tone="grey"
    >
      <div className="contact">
        <ul className="contact__direct" data-reveal>
          <li>
            <PiEnvelopeSimple aria-hidden="true" />
            <a className="link" href={`mailto:${profile.email}`}>
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

        <form className="contact__form" onSubmit={handleSubmit} data-reveal>
          <div className="field">
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required />
          </div>

          <div className="field">
            <label htmlFor="contact-email">Email address</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="field field--full">
            <label htmlFor="contact-subject">
              Subject <span className="field__optional">(optional)</span>
            </label>
            <input id="contact-subject" name="subject" type="text" />
          </div>

          <div className="field field--full">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="6" required />
          </div>

          {/* Hidden from people; bots that fill it in are discarded by Formspree. */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" hidden />

          <div className="contact__submit field--full">
            <Button type="submit" disabled={status === "sending"} icon={<PiPaperPlaneTilt />}>
              {status === "sending" ? "Sending…" : "Send message"}
            </Button>

            <p className={`contact__status is-${status}`} role="status">
              {status === "sent" && "Message sent. I'll reply by email."}
              {status === "error" && (
                <>
                  The message didn&apos;t send. Try again, or email me at{" "}
                  <a className="link" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
