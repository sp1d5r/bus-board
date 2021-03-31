/* 
  MAIN APPLICATION
*/

import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Home from "./components/Home";
import NavBar from "./components/Navbar";
import StationPage from "./components/StationPage";

import type { Station } from "./api";

const App = () => {
  const [stations, setStations] = useState<Station[]>([]);

  return (
    <Router>
      <div>
        <NavBar />
        <Container>
          <Switch>
            <Route path="/:stationId">
              <StationPage stations={stations} />
            </Route>
            <Route path="/">
              <Home stations={stations} setStations={setStations} />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
