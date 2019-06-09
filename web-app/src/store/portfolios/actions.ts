import { action } from 'typesafe-actions'
import { PortfoliosActionTypes, Portfolio } from './types'

export const fetchRequest = () => action(PortfoliosActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Portfolio[]) => action(PortfoliosActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(PortfoliosActionTypes.FETCH_ERROR, message)