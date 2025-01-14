import React, { useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { gsap } from "gsap";
import "../styling/footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleHoverIn = (element) => {
      gsap.to(element, {
        opacity: 1,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleHoverOut = (element) => {
      gsap.to(element, { opacity: 0, y: 10, duration: 0.3, ease: "power2.in" });
    };

    const links = document.querySelectorAll(".icon-link");
    links.forEach((link) => {
      const text = link.querySelector(".icon-text");
      link.addEventListener("mouseenter", () => handleHoverIn(text));
      link.addEventListener("mouseleave", () => handleHoverOut(text));
    });

    return () => {
      links.forEach((link) => {
        const text = link.querySelector(".icon-text");
        link.removeEventListener("mouseenter", () => handleHoverIn(text));
        link.removeEventListener("mouseleave", () => handleHoverOut(text));
      });
    };
  }, []);

  return (
    <div className="footer">
      <div className="footer-left">
        <a
          href="https://www.linkedin.com/in/momna-batool/"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <FaLinkedin size={24} />
          <span className="icon-text">Wanna know me?</span>
        </a>
        <a
          href="https://github.com/MomnaBukhari"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <FaGithub size={24} />
          <span className="icon-text">Ah! my struggles!</span>
        </a>
        <a
          href="mailto:smomnabatool@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <FaEnvelope size={24} />
          <span className="icon-text">Let's talk now, cutie!</span>
        </a>
      </div>

      <div className="footer-center">Made with 💗 by Momna</div>
      <div className="footer-right" onClick={scrollToTop}>
        <img src="public/icons/gototop.png" alt="Go to Top" />
        <span className="icon-text">Let's go to Top!</span>
      </div>
    </div>
  );
};

export default Footer;
