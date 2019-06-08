import * as React from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import NormalizedObjects from '../../store/NormalizedObjects'
import { ApplicationState, ConnectedReduxProps } from '../../store'

import { Currency } from '../../store/currencies/types'
import { Dividend } from '../../store/dividends/types'



import { fetchRequest as currenciesFetchRequest } from '../../store/currencies/actions'
import { fetchRequest as dividendsFetchRequest } from '../../store/dividends/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  currencies: { entities: NormalizedObjects<Currency>, lastFetched: Date }
  dividends: { entities: NormalizedObjects<Dividend>, lastFetched: Date }
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  currenciesFetchRequest: typeof currenciesFetchRequest
  dividendsFetchRequest: typeof dividendsFetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps


class DividendsIndexPage extends React.Component<AllProps> {  
  public componentDidMount() {
      this.props.currenciesFetchRequest()
      this.props.dividendsFetchRequest()
  }

  public render() {
    const { currencies, dividends, loading } = this.props
    const renderCurrency = (amount: number, currencyId: string) => `${amount} ${currencyId}`
    return (
      <Container>
        <Table>
          <thead>
            <tr><th>Ticker</th><th>Period</th><th>Amount</th></tr>
          </thead>
          <tbody>
            { loading ? null : dividends.entities.allIds.map((dividendId, index) => { 
              const dividend = dividends.entities.byId[dividendId]
              return (
                <tr key={index}>
                  <td>{dividend.stockId}</td>
                  <td>{dividend.period}</td>
                  <td>{renderCurrency(dividend.amount, currencies.entities.byId[dividend.currencyId].currencyId)}</td>
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
  dividendsFetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DividendsIndexPage)