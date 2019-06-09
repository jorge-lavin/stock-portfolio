import * as React from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import NormalizedObjects from '../store/NormalizedObjects'
import { ApplicationState, ConnectedReduxProps } from '../store'
import { Sector } from '../store/sectors/types'
import { fetchRequest as sectorsFecthRequest } from '../store/sectors/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  sectors: { entities: NormalizedObjects<Sector>, lastFetched: Date }
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  sectorsFecthRequest: typeof sectorsFecthRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps


class SectorsContainer extends React.Component<AllProps> {  
  public componentDidMount() {
      this.props.sectorsFecthRequest()
  }

  public render() {
    const { loading, sectors } = this.props
    return (
      <Container>
        <Table>
          <thead>
            <tr><th>SectorId</th><th>SectorName</th></tr>
          </thead>
          <tbody>
            { loading ? null : sectors.entities.allIds.map((sectorId, index) => { 
              const sector = sectors.entities.byId[sectorId]
              return (
                <tr key={index}>
                  <td>{sector.sectorId}</td>
                  <td>{sector.name}</td>
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
  sectorsFecthRequest,
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectorsContainer)