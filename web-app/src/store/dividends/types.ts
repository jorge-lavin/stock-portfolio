import NormalizedState from '../NormalizedObjects'

export interface Dividend {
  dividendId: string; /**stockId+date as string */
  stockId: string;
  date: Date;
  currencyId: number;
  period: number;
  amount: number;
}

export type ApiResponse = Record<string, any>

export enum DividendsActionTypes {
  FETCH_REQUEST = '@@dividends/FETCH_REQUEST',
  FETCH_SUCCESS = '@@dividends/FETCH_SUCCESS',
  FETCH_ERROR = '@@dividends/FETCH_ERROR',
}

export interface DividendsState {
  lastFetched: Date,
  readonly loading: boolean,
  readonly entities: NormalizedState<Dividend>,
  readonly errors?: string
}