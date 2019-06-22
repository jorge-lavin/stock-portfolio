import initialState from './initialState';
import { FETCH_DIVIDENDS_REQUEST, FETCH_DIVIDENDS_SUCCESS, FETCH_DIVIDENDS_FAILURE } from '../actions/dividends';

const dividendsReducer = (state = initialState.dividends, action) => {
  switch (action.type) {
    case FETCH_DIVIDENDS_REQUEST:
      return {...state, loading: true}

    case FETCH_DIVIDENDS_SUCCESS:
      const newState = { ...state, loading: false }
      const dividends = action.payload
      dividends.forEach(dividend => {
        // FIXME Let's use sets
        // First time we see the dividends for this stock        
        if(!newState.allIds.includes(dividend.stockId)) {
          newState.allIds.push(dividend.stockId)
          newState.byId[dividend.stockId]  = []
        }
        
        if (!newState.byId[dividend.stockId].includes(dividend)) {
          newState.byId[dividend.stockId].push(dividend) 
        }
      });
      return newState

    case FETCH_DIVIDENDS_FAILURE:
      return { ...state, loading: false, error: action.payload }
      
    default:
      return state;
  }
}

export default dividendsReducer