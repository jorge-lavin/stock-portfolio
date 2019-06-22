import React from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

const Stocks = ({error, stocks, loading}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Sector</th>
          <th>Country</th>
          <th>Fundamentals</th>
        </tr>
      </thead>
      <tbody>
        {
          loading ? <tr><th>loading...</th></tr> :
          stocks.allIds.map(stockId => {
            const stock = stocks.byId[stockId]
            return (
              <tr key={stockId}>
                <td>{stockId}</td>
                <td>{stock.sectorId}</td>
                <td>{stock.countryId}</td>
                <td><Link to={`/stocks/${stockId}/fundamentals/`}>Fundamentals</Link></td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )  
}

export default Stocks
