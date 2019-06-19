import React from 'react'
import { connect } from 'react-redux';

import StocksComponent from '../components/Stocks'
import { fetchStocksRequest } from '../actions/stocks'

class Stocks extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchStocksRequest())
  }

  render() {
    const { error, loading, stocks } = this.props
    
    return <StocksComponent error={error} loading={loading} stocks={stocks} />
  }
}

const mapStateToProps = state => ({
  stocks: state.stocks.stocks,
  loading: state.stocks.loading,
  error: state.stocks.error
});

export default connect(mapStateToProps)(Stocks)