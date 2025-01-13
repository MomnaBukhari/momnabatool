import React, { useEffect, useRef } from "react";
import "../../styling/blocks/Hero.css";

function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.25; // Adjust the playback rate as desired
    }
  }, []);

  return (
    <>
      <section id="hero" className="hero">
        <video
          ref={videoRef}
          className="hero-video"
          src="/videos/Background.mp4"
          autoPlay
          loop
          muted
        ></video>
      </section>
    </>
  );
}

export default Hero;
