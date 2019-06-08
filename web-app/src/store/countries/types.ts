import NormalizedState from '../NormalizedObjects'

export interface Country {
  countryId: string;
  name: string;
}

export type ApiResponse = Record<string, any>

export enum CountriesActionTypes {
  FETCH_REQUEST = '@@countries/FETCH_REQUEST',
  FETCH_SUCCESS = '@@countries/FETCH_SUCCESS',
  FETCH_ERROR = '@@countries/FETCH_ERROR',
}

export interface CountriesState {
  readonly loading: boolean,
  readonly entities: NormalizedState<Country>,
  readonly errors?: string
}