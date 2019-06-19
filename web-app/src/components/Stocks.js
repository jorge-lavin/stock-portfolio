import React from 'react'
import Table from 'react-bootstrap/Table'

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
                <td>Fundamentals</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )  
}

export default Stocks
