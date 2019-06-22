import React from 'react'
import { connect } from 'react-redux'

import FundamentalsComponent from '../components/Fundamentals'
import { fetchDividendsRequest } from '../actions/dividends'

class Fundamentals extends React.Component {
  componentWillMount() {
    const stockId = stockIdFromLocation(this.props.location)
    this.props.dispatch(fetchDividendsRequest(stockId))
  }

  render() {
    const { error, loading, byId, location } = this.props
    const currentDividends = byId[stockIdFromLocation(location)] || []
    return <FundamentalsComponent error={error} loading={loading} dividends={currentDividends} />
  }
}


const mapStateToProps = state => ({
  ...state.dividends
});

// Pathname for BME:ENG "/stocks/BME:ENG/fundamentals/"
const stockIdFromLocation = (location) => location.pathname.split("/")[2]

export default connect(mapStateToProps)(Fundamentals)