import initialState from './initialState';
import { FETCH_STOCKS_REQUEST, FETCH_STOCKS_SUCCESS, FETCH_STOCKS_FAILURE } from '../actions/stocks';

const stocksReducer = (state = initialState.stocks, action) => {
  switch (action.type) {
    case FETCH_STOCKS_REQUEST:
      return {...state, loading: true}
    case FETCH_STOCKS_SUCCESS:
      const newState = { ...state, loading: false }
      const stocks = action.payload
      stocks.forEach(stock => {
        // Append to allIds array only if not exists
        if(!newState.stocks.allIds.includes(stock.stockId)) {
          newState.stocks.allIds.push(stock.stockId)
        }
        newState.stocks.byId[stock.stockId] = stock
      });
      return newState
    case FETCH_STOCKS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}

export default stocksReducer