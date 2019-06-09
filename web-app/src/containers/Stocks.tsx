import * as React from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import NormalizedObjects from '../store/NormalizedObjects'
import { ApplicationState, ConnectedReduxProps } from '../store'
import { Country } from '../store/countries/types'
import { Sector } from '../store/sectors/types'
import { Stock } from '../store/stocks/types'
import { fetchRequest as countriesFetchRequest } from '../store/countries/actions'
import { fetchRequest as sectorsFecthRequest } from '../store/sectors/actions'
import { fetchRequest as stocksFetchRequest } from '../store/stocks/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  countries: { entities: NormalizedObjects<Country>, lastFetched: Date }
  sectors: { entities: NormalizedObjects<Sector>, lastFetched: Date }
  stocks: { entities: NormalizedObjects<Stock>, lastFetched: Date }
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  countriesFetchRequest: typeof countriesFetchRequest
  sectorsFecthRequest: typeof sectorsFecthRequest
  stocksFetchRequest: typeof stocksFetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps


class StocksIndexPage extends React.Component<AllProps> {  
  public componentDidMount() {
      this.props.countriesFetchRequest()
      this.props.sectorsFecthRequest()
      this.props.stocksFetchRequest()
  }

  public render() {
    const { countries, loading, sectors, stocks } = this.props
    return (
      <Container>
        <Table>
          <thead>
            <tr><th>Ticker</th><th>Country</th><th>Sector</th></tr>
          </thead>
          <tbody>
            { loading ? null : stocks.entities.allIds.map((stockId, index) => { 
              const stock = stocks.entities.byId[stockId]
              return (
                <tr key={index}>
                  <td>{stock.stockId}</td>
                  <td>{countries.entities.byId[stock.countryId].name}</td>
                  <td>{sectors.entities.byId[stock.sectorId].name}</td>
                </tr> 
              )}) 
            }
          </tbody>
        </Table>
      </Container>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ countries, sectors, stocks }: ApplicationState) => ({
  loading: countries.loading || sectors.loading || stocks.loading,
  errors: countries.errors || sectors.errors || stocks.errors,
  countries: { entities: countries.entities, lastFetched: countries.lastFetched },
  sectors: { entities: sectors.entities, lastFetched: sectors.lastFetched },
  stocks: { entities: stocks.entities, lastFetched: stocks.lastFetched }
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  countriesFetchRequest, 
  sectorsFecthRequest,
  stocksFetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StocksIndexPage)