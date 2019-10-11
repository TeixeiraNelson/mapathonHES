import React, { useState } from "react";
import "./App.css";
import { useAuth0 } from "./react-auth0-spa";
import Loading from "./components/Loading";
import FixedNavbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Help from "./components/Help";
import Edit from "./components/Edit";
import Logout from "./components/Logout";
//app component main
function App() {
  let { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="App">
        <FixedNavbar />
        <Switch>
          <Route path="/edit">
            <Authentication />
          </Route>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Logout />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

//Check if loggedIn and only then redirect to edit
function Authentication() {
  if (useAuth0().isAuthenticated) {
    return <Edit />;
  } else {
    return <Home />;
  }
}

export default App;
