import React from 'react'
import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import hutWood from "../assets/hut-wood.svg";
import 'bootstrap/dist/css/bootstrap.css';

import * as userService from '../utilities/users-services';

function NavBar(props) {
  // Add in functionality to log out
  function handleLogOut () {
    // Delegate to users-service
    userService.logOut();
    // update state will also cause a re-render
    props.setUser(null);
  }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <img src = {hutWood} style = {{width: "40px"}}/>
        </Navbar.Brand>
        <Navbar.Text>
            Welcome, {props.user.name}
          </Navbar.Text>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="huts/my">My Hut</Nav.Link>
            <Nav.Link href="/new-script">New Script</Nav.Link>
            <Nav.Link href="/huts">Search Huts</Nav.Link>
            <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    // //OLD NAV BAR: 
    // <nav>
    //     <Link to='huts/my'>My Scripts</Link>
    //     &nbsp; | &nbsp;
    //     <Link to='/new-script'>New Script</Link>
    //     &nbsp; | &nbsp;
    //     <span>Welcome, {props.user.name}</span>
    //     &nbsp; | &nbsp;
    //     <Link to="" onClick={handleLogOut}>Log Out</Link>
    //     &nbsp; | &nbsp;
    //     <Link to="/huts">Search Huts</Link>
    // </nav>
  )
}

export default NavBar