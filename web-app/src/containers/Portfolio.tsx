import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router';


import { ApplicationState, ConnectedReduxProps } from '../store'
import NormalizedObjects from '../store/NormalizedObjects'
import { Dividend } from '../store/dividends/types'
import { Portfolio } from '../store/portfolios/types'
import { fetchRequest as portfoliosFetchRequest } from '../store/portfolios/actions'
import PortfolioComponent from '../components/Portfolio';


// Separate state props + dispatch props to their own interfaces.
interface MatchParams {
  portfolioId: string;
}

interface PropsFromState extends RouteComponentProps<MatchParams> {
  portfolios:{ entities: NormalizedObjects<Portfolio>, lastFetched: Date } ,
  dividends: { entities: NormalizedObjects<Dividend>, lastFetched: Date }
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  portfoliosFetchRequest: typeof portfoliosFetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps


class PortfoliosContainer extends React.Component<AllProps> {  
  public componentDidMount() {
      //this.props.portfoliosFetchRequest()
      // TODO Fetch portfolio and dividends if needed ...
  }

  public render() {
    const { portfolios, dividends, match } = this.props
    const portfolio = portfolios.entities.byId[match.params.portfolioId]
    return (
      <PortfolioComponent portfolio={portfolio} dividends={dividends} />
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ dividends, portfolios }: ApplicationState) => ({
  loading: dividends.loading || portfolios.loading,
  errors: dividends.errors || portfolios.errors,
  dividends: { entities: dividends.entities, lastFetched: dividends.lastFetched },
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