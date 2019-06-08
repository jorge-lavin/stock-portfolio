import { Reducer } from 'redux'
import { SectorsState, SectorsActionTypes, Sector } from './types'

// Type-safe initialState!
const initialState: SectorsState = {
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
const reducer: Reducer<SectorsState> = (state = initialState, action) => {
  switch (action.type) {
    case SectorsActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }

    case SectorsActionTypes.FETCH_SUCCESS: 
      const allIds = action.payload.map((s:Sector) => s.sectorId)
      const byId = action.payload.reduce((acc: any, sector:Sector) => {
        acc[sector.sectorId] = sector
        return acc
      }, {});
      return { ...state, loading: false, entities: { allIds, byId }, lastFetched: new Date() }

    case SectorsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as sectorsReducer }