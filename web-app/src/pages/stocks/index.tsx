import * as React from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'


import NormalizedObjects from '../../store/NormalizedObjects'
import { ApplicationState, ConnectedReduxProps } from '../../store'
import { Stock } from '../../store/stocks/types'
import { Country } from '../../store/countries/types'
import { fetchRequest as stocksFetchRequest } from '../../store/stocks/actions'
import { fetchRequest as countriesFetchRequest } from '../../store/countries/actions'


// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  countries: NormalizedObjects<Country>
  stocks: NormalizedObjects<Stock>
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  countriesFetchRequest: typeof countriesFetchRequest
  stocksFetchRequest: typeof stocksFetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps


class StocksIndexPage extends React.Component<AllProps> {  
  public componentDidMount() {
    this.props.countriesFetchRequest()
    this.props.stocksFetchRequest()
  }

  public render() {
    const { stocks, countries } = this.props
    return (
      <Container>
        <Table>
          <thead>
           <tr><th>Ticker</th><th>Country</th><th>Sector</th></tr>
          </thead>
          <tbody>
            { stocks.allIds.map ((stockId, index) => { 
              const stock = stocks.byId[stockId]
              return (
                <tr key={index}>
                  <td>{stock.stockId}</td>
                  <td>{countries.byId[stock.countryId].name}</td>
                  <td>{stock.sectorId}</td>
                </tr> )
              }) 
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
const mapStateToProps = ({ stocks, countries }: ApplicationState) => ({
  loading: stocks.loading || countries.loading,
  errors: stocks.errors || countries.errors,
  countries: countries.entities,
  stocks: stocks.entities
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  countriesFetchRequest, 
  stocksFetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StocksIndexPage)
