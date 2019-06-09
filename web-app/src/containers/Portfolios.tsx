import * as React from 'react'
import { connect } from 'react-redux'

import NormalizedObjects from '../store/NormalizedObjects'
import { ApplicationState, ConnectedReduxProps } from '../store'
import { Portfolio } from '../store/portfolios/types'
import { fetchRequest as portfoliosFetchRequest } from '../store/portfolios/actions'
import PortfoliosComponent from '../components/Portfolios';


// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  portfolios: { entities: NormalizedObjects<Portfolio>, lastFetched: Date }
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  portfoliosFetchRequest: typeof portfoliosFetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps


class PortfoliosContainer extends React.Component<AllProps> {  
  public componentDidMount() {
      this.props.portfoliosFetchRequest()
  }

  public render() {
    const { portfolios, loading, errors } = this.props
    return (
      <PortfoliosComponent portfolios={portfolios} loading={loading} errors={errors} />
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ portfolios }: ApplicationState) => ({
  loading: portfolios.loading,
  errors: portfolios.errors,
  portfolios: { entities: portfolios.entities, lastFetched: portfolios.lastFetched }
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  portfoliosFetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfoliosContainer)