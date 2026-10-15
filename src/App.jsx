import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollTrigger } from "./lib/gsap";
import { scrollToSection } from "./lib/scroll";
import { initInterfaceSounds } from "./lib/sound";
import SmoothScroll from "./components/layout/SmoothScroll";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Cursor from "./components/cursor/Cursor";
import Loader from "./components/loader/Loader";
import { PageTransitionProvider } from "./components/layout/PageTransition";

/**
 * The frame every page sits in: the hello screen, navigation, the cursor, smooth
 * scrolling and page transitions. Pages render into <Outlet />.
 */
export default function App() {
  const { pathname } = useLocation();

  useEffect(() => initInterfaceSounds(), []);

  useEffect(() => {
    // Fonts and images change the page height after first paint; re-measure when they land.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <PageTransitionProvider>
      <SmoothScroll />

      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          if (pathname === "/") scrollToSection("about");
          else document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>

      <Loader />
      <Nav />
      <Cursor />

      {/* ScrollSmoother moves #smooth-content; anything fixed stays outside it. */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Outlet />
          <Footer />
        </div>
      </div>
    </PageTransitionProvider>
  );
}
