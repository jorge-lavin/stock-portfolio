import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'


import stocksReducer from './stocksReducer';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  stocks: stocksReducer,
});

export default rootReducer;