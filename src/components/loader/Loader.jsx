import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { lockScroll } from "../../lib/scroll";
import { profile } from "../../data/profile";
import "./Loader.css";

// Hello in many languages, with the language written underneath in pen.
// Add, remove or reorder freely; the first and last are what people see longest.
const GREETINGS = [
  ["Hello", "English"],
  ["السلام علیکم", "Urdu"],
  ["Bonjour", "French"],
  ["Hola", "Spanish"],
  ["مرحبا", "Arabic"],
  ["Ciao", "Italian"],
  ["नमस्ते", "Hindi"],
  ["Merhaba", "Turkish"],
  ["你好", "Chinese"],
  ["Olá", "Portuguese"],
  ["こんにちは", "Japanese"],
  ["Hallo", "German"],
  ["안녕하세요", "Korean"],
  ["Xin chào", "Vietnamese"],
  ["Здравствуйте", "Russian"],
  ["Γειά σου", "Greek"],
  ["Hej", "Swedish"],
  ["สวัสดี", "Thai"],
  ["שלום", "Hebrew"],
  ["Habari", "Swahili"],
  ["Hello", "and welcome"],
];

/**
 * The welcome screen: "hello" in twenty-one languages while a line of ink
 * draws across, then the sheet lifts away. Click or press any key to skip.
 * When it's gone it fires the "intro:done" event the hero waits for.
 */
export default function Loader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef(null);
  const wordRef = useRef(null);
  const langRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const word = wordRef.current;
    const lang = langRef.current;
    let finished = false;
    let timer = 0;
    lockScroll(true);

    const finish = () => {
      if (finished) return;
      finished = true;
      window.__introDone = true;
      window.dispatchEvent(new Event("intro:done"));
      lockScroll(false);
      setDone(true);
    };

    const show = ([text, language]) => {
      word.textContent = text;
      lang.textContent = language;
    };

    if (prefersReducedMotion()) {
      show(GREETINGS[0]);
      timer = window.setTimeout(() => {
        gsap.to(root, { opacity: 0, duration: 0.3, onComplete: finish });
      }, 700);
      return () => {
        window.clearTimeout(timer);
        lockScroll(false);
      };
    }

    // Each word stays a little longer than the last, like a wheel slowing down.
    const holds = GREETINGS.map((_, index) => {
      if (index === 0) return 420;
      if (index === GREETINGS.length - 1) return 700;
      return 70 + index * 6;
    });
    const total = holds.reduce((sum, ms) => sum + ms, 0) / 1000;

    const leave = () => {
      if (finished) return;
      window.clearTimeout(timer);
      gsap
        .timeline({ onComplete: finish })
        .to(".loader__inner", { y: -40, opacity: 0, duration: 0.45, ease: "power2.in" })
        .to(root, {
          yPercent: -100,
          borderBottomLeftRadius: "50% 22vh",
          borderBottomRightRadius: "50% 22vh",
          duration: 0.9,
          ease: "expo.inOut",
        }, "-=0.15");
    };

    const intro = gsap
      .timeline()
      .from(".loader__inner > *", { y: 24, opacity: 0, duration: 0.7, ease: "expo.out", stagger: 0.08 })
      .fromTo(lineRef.current.querySelector("path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: total, ease: "power1.inOut" }, 0.1);

    let index = 0;
    const next = () => {
      index += 1;
      if (index >= GREETINGS.length) {
        leave();
        return;
      }
      show(GREETINGS[index]);
      gsap.fromTo(word, { y: 14, opacity: 0.2, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.22, ease: "power2.out" });
      timer = window.setTimeout(next, holds[index]);
    };
    show(GREETINGS[0]);
    timer = window.setTimeout(next, holds[0]);

    const skip = () => leave();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    return () => {
      window.clearTimeout(timer);
      intro.kill();
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      lockScroll(false);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="loader graph-paper" aria-hidden="true">
      <div className="loader__inner">
        <p ref={wordRef} className="loader__word" dir="auto" />
        <p ref={langRef} className="loader__lang hand" />
        <svg ref={lineRef} className="loader__line" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M4 14 C 60 4, 120 22, 200 12 S 330 4, 396 12" />
        </svg>
        <p className="loader__welcome hand">Welcome to {profile.firstName}&apos;s world</p>
      </div>
      <p className="loader__skip">Click anywhere to skip</p>
    </div>
  );
}
