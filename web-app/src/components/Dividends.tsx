import React from 'react'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

interface IProps {}

interface IState {
  columns: String[],
  rows:    String[][]
}


class Dividends extends React.PureComponent<IProps, IState> {
  readonly state = {
    columns: ["Ticker", "Date", "Amount"],
    rows    : [ ["A", "ES", "Foo"], ["B", "EN", "Bar"]    ]
  }

  public render() {           
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              {this.state.columns.map( (col, index) => <th key={index}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((row, index) => <tr key={index}>{row.map( (cell, index) => <td key={index}>{cell}</td>)}</tr>)}
          </tbody>
        </Table>      
      </Container>
    );
  }
}

export default Dividends;