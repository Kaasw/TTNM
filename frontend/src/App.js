import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screen/LoginScreen";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar outside the Routes */}

      <Routes>  {/* Wrap all your routes inside the Routes component */}
        <Route path="/" exact />
        <Route path="/login" exact element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
