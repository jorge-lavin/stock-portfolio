import NormalizedState from '../NormalizedObjects'

export interface Currency {
  currencyId: string;
  name: string;
}

export type ApiResponse = Record<string, any>

export enum CurrenciesActionTypes {
  FETCH_REQUEST = '@@currencies/FETCH_REQUEST',
  FETCH_SUCCESS = '@@currencies/FETCH_SUCCESS',
  FETCH_ERROR = '@@currencies/FETCH_ERROR',
}

export interface CurrenciesState {
  lastFetched: Date,
  readonly loading: boolean,
  readonly entities: NormalizedState<Currency>,
  readonly errors?: string
}