import React from 'react'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { LinkContainer } from 'react-router-bootstrap'

class Header extends React.Component {
  public render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/portfolios">
              <Nav.Link>Portfolios</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/stocks">
              <Nav.Link>Stocks</Nav.Link>
            </LinkContainer>
            <LinkContainer to ="/dividends">
              <Nav.Link>Dividends</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header