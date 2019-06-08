import { action } from 'typesafe-actions'
import { StocksActionTypes, Stock } from './types'

export const fetchRequest = () => action(StocksActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Stock[]) => action(StocksActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(StocksActionTypes.FETCH_ERROR, message)