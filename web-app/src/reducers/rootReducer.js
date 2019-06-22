import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import stocksReducer from './stocksReducer';
import dividendsReducer from './dividendsReducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  stocks: stocksReducer,
  dividends: dividendsReducer,
});

export default rootReducer;