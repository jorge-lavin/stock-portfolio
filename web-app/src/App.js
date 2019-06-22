import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'


import configureStore from './store/configureStore';
import Home from './components/Home'
import Portfolios from './components/Portfolios'
import Stocks from './containers/Stocks'
import Fundamentals from './containers/Fundamentals'

const store = configureStore()

const App = () => 
  <Provider store={store}>
    <BrowserRouter>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Stock Portfolio Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/portfolios"><Nav.Link>Portfolios</Nav.Link></LinkContainer>
            <LinkContainer to="/stocks"><Nav.Link>Stocks</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/" component={Home}/>        
      <Route exact path="/portfolios" component={Portfolios}/>
      <Route exact path="/stocks" component={Stocks}/>
      <Route path="/stocks/:stockId/fundamentals" component={Fundamentals}/>
    </BrowserRouter>
  </Provider>

export default App;
