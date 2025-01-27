/* Imports */
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import "../../styling/blocks/loader.css";


/* Variable Declaration */
const greetings = [
  "Hello", "Hallo", "السلام علیکم", "مرحبا", "Merhaba", "Bonjour", "Hola", "Ciao",
  "Olá", "नमस्ते", "你好", "こんにちは", "Xin chào", "안녕하세요", "Здравствуйте",
  "Γειά σου", "Hej", "สวัสดี", "שלום", "Habari"
];


// eslint-disable-next-line react/prop-types
const Loader = ({ onComplete }) => {


  /* State managment */
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % greetings.length;
      setCurrentGreeting(greetings[index]);
    }, 170);

    const timeout = setTimeout(() => {
      setLoading(false);
      onComplete && onComplete();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  useEffect(() => {
    gsap.fromTo(".greeting", { opacity: 1 }, { opacity: 1, duration: 0.5 });
  }, [currentGreeting]);

  if (!loading) return null;

  return (
    <div className="loader">
      <div className="text">
        <h1 className="greeting">{currentGreeting}</h1>
        <p className="static-text">Welcome to Momna&apos;s World!</p>
      </div>
    </div>
  );
};

export default Loader;
