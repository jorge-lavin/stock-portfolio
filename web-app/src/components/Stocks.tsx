import React from 'react'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

interface IProps {}

interface IState {
  columns: String[],
  rows:    String[][]
}


class Stocks extends React.PureComponent<IProps, IState> {
  readonly state = {
    columns: ["Ticker", "Country", "Sector"],
    rows    : [ ["A", "ES", "Foo"], ["B", "EN", "Bar"]    ]
  }

  public render() {           
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              {this.state.columns.map( col => <th>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map(row => <tr>{row.map(cell => <td>{cell}</td>)}</tr>)}
          </tbody>
        </Table>      
      </Container>
    );
  }
}

export default Stocks;