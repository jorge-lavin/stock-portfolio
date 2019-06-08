    
import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import countriesSaga from './countries/sagas'
import { countriesReducer } from './countries/reducer'
import { CountriesState } from './countries/types'

import stocksSaga from './stocks/sagas'
import { stocksReducer } from './stocks/reducer'
import { StocksState } from './stocks/types'



// The top-level state object
export interface ApplicationState {
  countries: CountriesState
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
    stocks: stocksReducer,
    router: connectRouter(history)
  })

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all(
    [fork(stocksSaga), fork(countriesSaga)]
  )
}