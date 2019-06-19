import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import Home from './Home'
import Portfolios from './Portfolios'
import Stocks from './Stocks'

const Header = () => 
  <BrowserRouter>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Stock Portfolio Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/portfolios">Portfolios</Nav.Link>
          <Nav.Link href="/stocks">Stocks</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Route exact path="/" component={Home}/>        
    <Route exact path="/portfolios" component={Portfolios}/>
    <Route exact path="/stocks" component={Stocks}/>
  </BrowserRouter>

export default Header  