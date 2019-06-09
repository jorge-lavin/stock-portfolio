import * as React from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import NormalizedObjects from '../store/NormalizedObjects'
import { ApplicationState, ConnectedReduxProps } from '../store'
import { Country } from '../store/countries/types'
import { fetchRequest as countriesFetchRequest } from '../store/countries/actions'


// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  countries: { entities: NormalizedObjects<Country>, lastFetched: Date }
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  countriesFetchRequest: typeof countriesFetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps


class CountriesContainer extends React.Component<AllProps> {  
  public componentDidMount() {
      this.props.countriesFetchRequest()
  }

  public render() {
    const { countries, loading } = this.props
    return (
      <Container>
        <Table>
          <thead>
            <tr><th>CountryId</th><th>Name</th></tr>
          </thead>
          <tbody>
            { loading ? null : countries.entities.allIds.map((countryId, index) => { 
              const country = countries.entities.byId[countryId]
              return (
                <tr key={index}>
                  <td>{country.countryId}</td>
                  <td>{country.name}</td>
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
const mapStateToProps = ({ countries }: ApplicationState) => ({
  loading: countries.loading,
  errors: countries.errors,
  countries: { entities: countries.entities, lastFetched: countries.lastFetched },
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  countriesFetchRequest, 
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountriesContainer)