import { Reducer } from 'redux'
import { StocksState, StocksActionTypes, Stock } from './types'

// Type-safe initialState!
const initialState: StocksState = {
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
const reducer: Reducer<StocksState> = (state = initialState, action) => {
  switch (action.type) {
    case StocksActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case StocksActionTypes.FETCH_SUCCESS: 
      const allIds = action.payload.map((s:Stock) => s.stockId)
      const byId = action.payload.reduce((acc: any, stock:Stock) => {
        acc[stock.stockId] = stock
        return acc
      }, {});
      return { ...state, loading: false, entities: { allIds, byId }, lastFetched: new Date() }
    
    case StocksActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as stocksReducer }