import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import "../../styling/blocks/loader.css";

const greetings = [
        { text: "Hello", language: "English" },
        { text: "Hallo", language: "German" },
        { text: "السلام علیکم", language: "Urdu" },
        { text: "مرحبا", language: "Arabic" },
        { text: "Merhaba", language: "Turkish" },
        { text: "Bonjour", language: "French" },
        { text: "Hola", language: "Spanish" },
        { text: "Ciao", language: "Italian" },
        { text: "Olá", language: "Portuguese" },
        { text: "नमस्ते", language: "Hindi" },
        { text: "你好", language: "Mandarin" },
        { text: "こんにちは", language: "Japanese" },
        { text: "Xin chào", language: "Vietnamese" },
        { text: "안녕하세요", language: "Korean" },
        { text: "Здравствуйте", language: "Russian" },
        { text: "Γειά σου", language: "Greek" },
        { text: "Hej", language: "Swedish" },
        { text: "สวัสดี", language: "Thai" },
        { text: "שלום", language: "Hebrew" },
        { text: "Habari", language: "Swahili" },
      ];

const Loader = ({ onComplete }) => {
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0].text);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let greetingIndex = 0;

    const interval = setInterval(() => {
      greetingIndex++;
      if (greetingIndex < greetings.length) {
        setCurrentGreeting(greetings[greetingIndex].text);
      }
    }, 250);

    const timeout = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  useEffect(() => {
    gsap.fromTo(
      ".greeting",
      { opacity: 0, y: 0 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [currentGreeting]);

  return (
    loading && (
      <div className="loader">
        <div className="text">
          <h1 className="greeting">{currentGreeting}</h1>
          <p className="static-text">Welcome to Momna's World!</p>
        </div>
      </div>
    )
  );
};

export default Loader;