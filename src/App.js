/* 
  MAIN APPLICATION
*/

import './App.css';
import {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Home from './components/Home';
import NavBar from './components/Navbar';

function App() {
  const [stations, setStations] = useState([]);

  return (
    <Router>
      <div>
        <NavBar />
        <Container>
          <Switch>
            <Route path="/:stationId">
              ABCD
            </Route>
            <Route path="/">
              <Home stations={stations} setStations={setStations}/>
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
