    
import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import countriesSaga from './countries/sagas'
import { countriesReducer } from './countries/reducer'
import { CountriesState } from './countries/types'

import currenciesSaga from './currencies/sagas'
import { currenciesReducer } from './currencies/reducer'
import { CurrenciesState } from './currencies/types'

import dividendsSaga from './dividends/sagas'
import { dividendsReducer } from './dividends/reducer'
import { DividendsState } from './dividends/types'

import portfoliosSaga from './portfolios/sagas'
import { portfoliosReducer } from './portfolios/reducer'
import { PortfoliosState } from './portfolios/types'

import sectorsSaga from './sectors/sagas'
import { sectorsReducer } from './sectors/reducer'
import { SectorsState } from './sectors/types'

import stocksSaga from './stocks/sagas'
import { stocksReducer } from './stocks/reducer'
import { StocksState } from './stocks/types'



// The top-level state object
export interface ApplicationState {
  countries: CountriesState
  currencies: CurrenciesState
  dividends: DividendsState
  portfolios: PortfoliosState
  sectors: SectorsState
  stocks: StocksState
  router: RouterState
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
  combineReducers({
    countries: countriesReducer,
    currencies: currenciesReducer,
    dividends: dividendsReducer,
    portfolios: portfoliosReducer,
    sectors: sectorsReducer,
    stocks: stocksReducer,
    router: connectRouter(history)
  })

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all(
    [
      fork(countriesSaga), fork(currenciesSaga), fork(dividendsSaga), 
      fork(portfoliosSaga), fork(sectorsSaga), fork(stocksSaga)
    ]
  )
}