import { Reducer } from 'redux'
import { CountriesState, CountriesActionTypes, Country } from './types'

// Type-safe initialState!
const initialState: CountriesState = {
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
const reducer: Reducer<CountriesState> = (state = initialState, action) => {
  switch (action.type) {
    case CountriesActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case CountriesActionTypes.FETCH_SUCCESS: 
      const allIds = action.payload.map((c:Country) => c.countryId)
      const byId = action.payload.reduce((acc: any, country:Country) => {
        acc[country.countryId] = country
        return acc
      }, {});
      action.payload.map((c:Country) => ({ [c.countryId] : {...c } }))

      return { ...state, loading: false, entities: { allIds, byId }, lastFetched: new Date() }
    
    case CountriesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as countriesReducer }