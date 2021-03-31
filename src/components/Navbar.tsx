/*
    NAVIGATION BAR
*/
import React, { FunctionComponent } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useHistory } from "react-router";

const NavBar: FunctionComponent = () => {
  const history = useHistory();
  return (
    <Navbar bg="light">
      <Navbar.Brand onClick={() => history.push("/")}>Bus Board</Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
