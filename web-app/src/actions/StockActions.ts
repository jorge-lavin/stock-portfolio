import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { IStock } from '../models/Stock'
import { IStockState } from '../reducers/stockReducer';

// Create Action Constants
export enum StockActionTypes {
  SAVE    = 'SAVE',
  GET_ONE = 'GET_ONE',
  GET_ALL = 'GET_ALL',
  UPDATE  = 'UPDATE',
  DELETE  = 'DELETE',
}

export interface IStockSaveAction {
  type: StockActionTypes.SAVE;
  stock: IStock;
}

export interface IStockGetOneAction {
  type: StockActionTypes.GET_ONE;
  stock: IStock;
}

export interface IStockGetAllAction {
  type: StockActionTypes.GET_ALL;
  stocks: IStock[];
}

export interface IStockUpdateAction {
  type: StockActionTypes.DELETE;
  stock: IStock;
}

export interface IStockDeleteAction {
  type: StockActionTypes.DELETE;
  stock: IStock;
}

export type StockActions = IStockSaveAction | IStockGetOneAction | IStockGetAllAction | IStockUpdateAction | IStockDeleteAction

export const getAllStocks: ActionCreator<
  ThunkAction<Promise<any>, IStockState, null, IStockGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('/api/v1/stocks/');
      dispatch({
        stocks: response.data,
        type: StockActionTypes.GET_ALL,
      });
    } catch (err) {
      console.error(err);
    }
  };
};