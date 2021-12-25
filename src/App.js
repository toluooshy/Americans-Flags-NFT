import "./App.css";
import React from "react";
import HomePage from "./pages/HomePage";
import MintPage from "./pages/MintPage";
import ViewPage from "./pages/ViewPage";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mint" element={<MintPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </div>
  );
}

export default App;
