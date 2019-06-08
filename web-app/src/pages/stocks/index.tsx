import * as React from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { Stock } from '../../store/stocks/types'
import { fetchRequest } from '../../store/stocks/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Stock[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps

class HeroesIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest()
  }

  public render() {
    const stocks = this.props.data
    const columns = ["Ticker", "CountryId", "SectorId"]
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map( (col, index) => <th key={index}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            { stocks == null ? "" : stocks.map( stock => <tr key={stock.stockId}><td>{stock.stockId}</td><td>{stock.countryId}</td><td>{stock.sectorId}</td></tr> ) }
          </tbody>
        </Table>      
      </Container>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ stocks }: ApplicationState) => ({
  loading: stocks.loading,
  errors: stocks.errors,
  data: stocks.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroesIndexPage)
