import React from 'react'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

import NormalizedObjects from '../store/NormalizedObjects'
import { Portfolio } from '../store/portfolios/types'

interface Props {
  loading: boolean
  portfolios: { entities: NormalizedObjects<Portfolio>, lastFetched: Date }
  errors?: string
}

const PortfoliosComponent: React.FC<Props> = (props) => {
  const { portfolios, loading } = props
  const buildLinkableTd = (to: string, contents: string) => <td><Link to={to}>{contents}</Link></td>
  return (
    <Container>
      <Table>
        <thead>
          <tr><th>PortfolioId</th><th>Name</th></tr>
        </thead>
        <tbody>
          { loading ? null : portfolios.entities.allIds.map((portfolioId, index) => { 
            const portfolio = portfolios.entities.byId[portfolioId]
            return (
              <tr key={index}>
                {buildLinkableTd(`portfolios/${portfolio.portfolioId}/`, portfolio.portfolioId)}
                {buildLinkableTd(`portfolios/${portfolio.portfolioId}/`, portfolio.name)}
              </tr> 
            )}) 
          }
        </tbody>
      </Table>
    </Container>
  )
}
export default PortfoliosComponent