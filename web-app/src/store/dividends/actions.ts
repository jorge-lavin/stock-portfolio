import { action } from 'typesafe-actions'
import { DividendsActionTypes, Dividend } from './types'

export const fetchRequest = () => action(DividendsActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Dividend[]) => action(DividendsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(DividendsActionTypes.FETCH_ERROR, message)