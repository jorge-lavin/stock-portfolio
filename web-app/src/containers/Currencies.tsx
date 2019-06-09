import * as React from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import NormalizedObjects from '../store/NormalizedObjects'
import { ApplicationState, ConnectedReduxProps } from '../store'
import { Currency } from '../store/currencies/types'
import { fetchRequest as currenciesFetchRequest } from '../store/currencies/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  currencies: { entities: NormalizedObjects<Currency>, lastFetched: Date }
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  currenciesFetchRequest: typeof currenciesFetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps


class CurrenciesContainer extends React.Component<AllProps> {  
  public componentDidMount() {
      this.props.currenciesFetchRequest()
  }

  public render() {
    const { currencies, loading } = this.props
    return (
      <Container>
        <Table>
          <thead>
            <tr><th>CurrencyId</th><th>Name</th></tr>
          </thead>
          <tbody>
            { loading ? null : currencies.entities.allIds.map((currencyId, index) => { 
              const currency = currencies.entities.byId[currencyId]
              return (
                <tr key={index}>
                  <td>{currency.currencyId}</td>
                  <td>{currency.name}</td>
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
const mapStateToProps = ({ currencies, dividends }: ApplicationState) => ({
  loading: currencies.loading || dividends.loading,
  errors: currencies.errors || dividends.errors,
  currencies: { entities: currencies.entities, lastFetched: currencies.lastFetched },
  dividends: { entities: dividends.entities, lastFetched: dividends.lastFetched }
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  currenciesFetchRequest,
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrenciesContainer)