import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesComponent from "./components/Routes";
import initializeCursor from "./scripting/cursor";
import Footer from "./components/Footer";
function App() {
  useEffect(() => {
    initializeCursor();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div id="cursor">M</div>
        <Navbar />
        <RoutesComponent />
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
