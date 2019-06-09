import { Reducer } from 'redux'
import { PortfoliosState, PortfoliosActionTypes, Portfolio } from './types'

// Type-safe initialState!
const initialState: PortfoliosState = {
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
const reducer: Reducer<PortfoliosState> = (state = initialState, action) => {
  switch (action.type) {
    case PortfoliosActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case PortfoliosActionTypes.FETCH_SUCCESS: 
      const allIds = action.payload.map((p: Portfolio) => p.portfolioId)
      const byId = action.payload.reduce((acc: any, p: Portfolio) => {
        acc[p.portfolioId] = p
        return acc
      }, {});

      return { ...state, loading: false, entities: { allIds, byId }, lastFetched: new Date() }
    
    case PortfoliosActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as portfoliosReducer }