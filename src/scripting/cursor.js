import gsap from "gsap";

const initializeCursor = () => {
  /* Variables Defining*/

  /*Handeling NOTFOUND condition*/
  if (!cursor) return;

  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    gsap.set(cursor, {
      x: cursorX,
      y: cursorY,
      opacity: 1,
    });

    requestAnimationFrame(animateCursor);
  };
  animateCursor();
};

export default initializeCursor;
