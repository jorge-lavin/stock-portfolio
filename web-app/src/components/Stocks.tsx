import React from 'react'
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import { IStock } from '../models/Stock'
import { IAppState } from '../store/Store';
import { getAllStocks } from '../actions/StockActions'
import { Dispatch } from 'redux';

interface IProps {
  stocks: IStock[]
}

interface IState {
  columns: string[]
  loading: boolean
}

class Stocks extends React.PureComponent<IProps, IState> {
  state = {
    columns: ["Ticker", "Country", "Sector"],
    loading: false
  }

  public render() {
    const { stocks } = this.props;
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              {this.state.columns.map( (col, index) => <th key={index}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            { stocks == null ? "" : stocks.map( stock => <tr key={stock.stockId}><td>{stock.stockId}</td><td>{stock.countryId}</td><td>{stock.sectorId}</td></tr> ) }
          </tbody>
        </Table>      
      </Container>
    );
  }
}

const mapStateToProps = (store: IAppState) => {
  return {
    stocks: store.stockState.stocks,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getAllStocks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stocks);