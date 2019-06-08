import NormalizedState from '../NormalizedObjects'

export interface Stock {
  stockId: string;
  sectorId: number;
  countryId: string;
}

export type ApiResponse = Record<string, any>

export enum StocksActionTypes {
  FETCH_REQUEST = '@@stocks/FETCH_REQUEST',
  FETCH_SUCCESS = '@@stocks/FETCH_SUCCESS',
  FETCH_ERROR = '@@stocks/FETCH_ERROR',
}

export interface StocksState {
  lastFetched: Date,
  readonly loading: boolean,
  readonly entities: NormalizedState<Stock>,
  readonly errors?: string
}