import { Reducer } from 'redux'
import { CurrenciesState, CurrenciesActionTypes, Currency } from './types'

// Type-safe initialState!
const initialState: CurrenciesState = {
  lastFetched: new Date(0),
  entities: {
    allIds: [],
    byId: {}
  },
  errors: undefined,
  loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<CurrenciesState> = (state = initialState, action) => {
  switch (action.type) {
    case CurrenciesActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }

    case CurrenciesActionTypes.FETCH_SUCCESS: 
      const allIds = action.payload.map((currency: Currency) => currency.currencyId)
      const byId = action.payload.reduce((acc: any, currency: Currency) => {
        acc[currency.currencyId] = currency
        return acc
      }, {});
      return { ...state, loading: false, entities: { allIds, byId }, lastFetched: new Date() }

    case CurrenciesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as currenciesReducer }