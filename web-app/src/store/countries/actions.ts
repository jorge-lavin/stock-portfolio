import { action } from 'typesafe-actions'
import { CountriesActionTypes, Country } from './types'

export const fetchRequest = () => action(CountriesActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Country[]) => action(CountriesActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(CountriesActionTypes.FETCH_ERROR, message)