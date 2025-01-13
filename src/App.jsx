import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesComponent from "./components/Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RoutesComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
