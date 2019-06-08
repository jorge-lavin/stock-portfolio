import { action } from 'typesafe-actions'
import { SectorsActionTypes, Sector } from './types'

export const fetchRequest = () => action(SectorsActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Sector[]) => action(SectorsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(SectorsActionTypes.FETCH_ERROR, message)