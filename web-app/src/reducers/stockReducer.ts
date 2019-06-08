// Import Reducer type
import { Reducer } from 'redux';

import {
  StockActions,
  StockActionTypes,
} from '../actions/StockActions';

import { IStock } from '../models/Stock'

// Define the Character State
export interface IStockState {
  readonly stocks: IStock[];
}

// Define the initial state
const initialStockState: IStockState = {
  stocks: [],
};

export const stockReducer: Reducer<IStockState, StockActions> = (
  state = initialStockState,
  action
) => {
  switch (action.type) {
    case StockActionTypes.GET_ALL: {
      return {
        ...state,
        stocks: action.stocks,
      };
    }
    default:
      return state;
  }
};