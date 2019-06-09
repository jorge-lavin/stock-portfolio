import * as React from 'react'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import NormalizedObjects from '../store/NormalizedObjects'
import { Dividend } from '../store/dividends/types'
import { Portfolio } from '../store/portfolios/types'


// Separate state props + dispatch props to their own interfaces.
interface Props {
  portfolio: Portfolio,
  dividends: { entities: NormalizedObjects<Dividend>, lastFetched: Date }
}

const PortfolioComponent: React.FC<Props> = (props) => {  
  const { portfolio, dividends } = props
  return (
    <Container>
      Hello from portfolio {portfolio.portfolioId}
      <Table>
        <thead>
          <tr><th>PortfolioId</th><th>Name</th></tr>
        </thead>
        <tbody>
          {
            /**  loading ? null : portfolios.entities.allIds.map((portfolioId, index) => { 
            const portfolio = portfolios.entities.byId[portfolioId]
            return (
              <tr key={index}>
                <td>{portfolio.portfolioId}</td>
                <td>{portfolio.name}</td>
              </tr> 
            )}) 
            */}
        </tbody>
      </Table>
    </Container>
  )
}

export default PortfolioComponent