import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Fonts are bundled with the site, so no third-party requests are made.
import "@fontsource-variable/inter/opsz.css";
import "@fontsource/kalam/latin-400.css";
import "@fontsource/kalam/latin-700.css";
import "@fontsource-variable/jetbrains-mono/index.css";

import "./theme/themes.css";
import "./styles/tokens.css";
import "./styles/base.css";

import { ThemeProvider } from "./theme/ThemeContext";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import Nook from "./pages/Nook.jsx";
import { nook } from "./data/profile";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Home />} />
            <Route path="projects/:slug" element={<ProjectPage />} />
            <Route path={nook.path.slice(1)} element={<Nook />} />
            {/* Old links like /about or /projects land on the right part of the home page. */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
