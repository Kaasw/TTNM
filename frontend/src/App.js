import React from "react";
// import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import LoginScreen from "./screen/LoginScreen";

function App() {
  return (
    <Router>


      <Switch>  {/* Wrap all your routes inside the Routes component */}
        <Route path="/" exact />
        {/* <Route path="/login" exact element={<LoginScreen />} /> */}
      </Switch>
    </Router>
  );
}

export default App;
