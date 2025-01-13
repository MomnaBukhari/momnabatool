import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesComponent from "./components/Routes";
import initializeCursor from "./scripting/cursor";
function App() {
  useEffect(() => {
    initializeCursor();
  }, []);

  return (
    <>
      <BrowserRouter>
      <div id="cursor"></div>
        <Navbar />
        <RoutesComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
