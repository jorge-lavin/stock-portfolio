import React from 'react'

import Container from 'react-bootstrap/Container'

import './App.css';
import Navigation from "./components/Navigation";
import Portfolio from  "./components/Portfolio";



export interface NavigationProps {}
  
class App extends React.PureComponent<NavigationProps> {
  public render() {
    return (
      <Container>
        <Navigation/>
        <Portfolio/>
      </Container>  
    );
  }
}

export default App;