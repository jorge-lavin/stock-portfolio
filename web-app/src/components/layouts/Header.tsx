import React from 'react'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { LinkContainer } from 'react-router-bootstrap'

class Header extends React.Component {
  public render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Portfolio Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {buildLinkContainer("/countries", "Countries")}
            {buildLinkContainer("/currencies", "Currencies")}
            {buildLinkContainer("/dividends", "Dividends")}
            {buildLinkContainer("/portfolios", "Portfolios")}
            {buildLinkContainer("/sectors", "Sectors")}
            {buildLinkContainer("/stocks", "Stocks")}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const buildLinkContainer = (to: string, linkName: string) => {
  return <LinkContainer to={to}>
    <Nav.Link>{linkName}</Nav.Link>
  </LinkContainer>
}

export default Header