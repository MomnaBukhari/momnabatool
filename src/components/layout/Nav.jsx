import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { PiDownloadSimple, PiSparkle } from "react-icons/pi";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { lockScroll, scrollToSection } from "../../lib/scroll";
import useActiveSection from "../../hooks/useActiveSection";
import { nook, profile, sections } from "../../data/profile";
import RollText from "../ui/RollText";
import { MediaButtons, ThemeDots } from "./Controls";
import { usePageTransition } from "./PageTransition";
import "./Nav.css";

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const go = usePageTransition();
  const ids = useMemo(() => sections.map((section) => section.id), []);
  const navSections = useMemo(() => sections.filter((section) => section.inNav !== false), []);
  const active = useActiveSection(ids, pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const linksRef = useRef(null);
  const markerRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A soft pill slides behind the link for the section you're reading.
  useLayoutEffect(() => {
    const marker = markerRef.current;
    const current = pathname === nook.path ? "nook" : onHome ? active : null;
    const link = linksRef.current?.querySelector(`[data-section="${current}"]`);
    if (!marker) return;
    if (!link) {
      gsap.to(marker, { autoAlpha: 0, duration: 0.25 });
      return;
    }
    gsap.to(marker, {
      x: link.offsetLeft,
      width: link.offsetWidth,
      autoAlpha: 1,
      duration: prefersReducedMotion() ? 0 : 0.55,
      ease: "elastic.out(1, 0.75)",
      overwrite: true,
    });
  }, [active, pathname, onHome]);

  // Mobile menu: lock the page, move focus in, close on Escape.
  useEffect(() => {
    lockScroll(open);
    if (!open) return undefined;
    menuRef.current?.querySelector("a")?.focus();
    if (!prefersReducedMotion()) {
      gsap.from(menuRef.current.querySelectorAll(".nav__menu-item"), {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
      });
    }
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1100px)");
    const onChange = () => wide.matches && setOpen(false);
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  const goToSection = (id, label) => (event) => {
    event.preventDefault();
    setOpen(false);
    if (onHome) requestAnimationFrame(() => scrollToSection(id));
    else go(`/#${id}`, label);
  };

  const goToNook = (event) => {
    event.preventDefault();
    setOpen(false);
    if (pathname !== nook.path) go(nook.path, nook.label);
  };

  const goHome = (event) => {
    event.preventDefault();
    if (onHome) scrollToSection("top");
    else go("/", profile.name);
  };

  const renderLinks = (className = "") => (
    <>
      {navSections.map((section) => (
        <li key={section.id} className={className}>
          <a
            href={`/#${section.id}`}
            data-section={section.id}
            aria-current={onHome && active === section.id ? "true" : undefined}
            onClick={goToSection(section.id, section.label)}
          >
            <RollText>{section.label}</RollText>
          </a>
        </li>
      ))}
      <li className={className}>
        <a
          href={nook.path}
          data-section="nook"
          className="nav__nook"
          aria-current={pathname === nook.path ? "page" : undefined}
          onClick={goToNook}
        >
          <PiSparkle aria-hidden="true" />
          <RollText>{nook.label}</RollText>
        </a>
      </li>
    </>
  );

  return (
    <div className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <nav className="nav__bar" aria-label="Main">
        <div className="nav__start">
          <ThemeDots />
          <a className="nav__brand" href="/" onClick={goHome}>
            <span className="nav__brand-full">{profile.name}</span>
            <span className="nav__brand-short">{profile.firstName}</span>
          </a>
        </div>

        <ul ref={linksRef} className="nav__links">
          <li ref={markerRef} className="nav__marker" aria-hidden="true" />
          {renderLinks()}
        </ul>

        <div className="nav__end">
          <MediaButtons />
          <a className="nav__cv" href={profile.cv} download data-cursor="Download my CV">
            <PiDownloadSimple aria-hidden="true" /> CV
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav__toggle-icon" aria-hidden="true" />
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" ref={menuRef} className="nav__menu" hidden={!open}>
        <ul>{renderLinks("nav__menu-item")}</ul>
        <div className="nav__menu-item nav__menu-themes">
          <p>Pick a colour</p>
          <ThemeDots size="large" />
        </div>
        <div className="nav__menu-item nav__menu-media">
          <MediaButtons />
          <a className="nav__cv" href={profile.cv} download>
            <PiDownloadSimple aria-hidden="true" /> Download CV
          </a>
        </div>
      </div>
    </div>
  );
}
