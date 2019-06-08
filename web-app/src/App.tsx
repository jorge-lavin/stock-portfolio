import React from 'react'

import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

import { BrowserRouter, Route } from 'react-router-dom'

import './App.css';
import Dividends from  "./components/Dividends";
import Home  from  "./components/Home";
import Portfolio from  "./components/Portfolio";
import Stocks from  "./components/Stocks";

  
class App extends React.PureComponent {
  public render() {
    return (
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Stock Portfolio Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/portfolio">Portfolio</Nav.Link>
            <Nav.Link href="/stocks">Stocks</Nav.Link>
            <Nav.Link href="/dividends">Dividends</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> 
        <Route exact path="/" component={Home}/>        
        <Route path="/portfolio" component={Portfolio}/>
        <Route path="/stocks" component={Stocks}/>
        <Route path="/dividends" component={Dividends}/>
      </BrowserRouter>
    );
  }
}

export default App;