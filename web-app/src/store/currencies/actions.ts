import { action } from 'typesafe-actions'
import { CurrenciesActionTypes, Currency } from './types'

export const fetchRequest = () => action(CurrenciesActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Currency[]) => action(CurrenciesActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(CurrenciesActionTypes.FETCH_ERROR, message)