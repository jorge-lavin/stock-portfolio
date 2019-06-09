import NormalizedState from '../NormalizedObjects'

export interface Portfolio {
  portfolioId: string;
  name: string;
  assets: Asset[]
}

export interface Asset {
  stockId: string;
  quantity: number;
}

export type ApiResponse = Record<string, any>

export enum PortfoliosActionTypes {
  FETCH_REQUEST = '@@portfolios/FETCH_REQUEST',
  FETCH_SUCCESS = '@@portfolios/FETCH_SUCCESS',
  FETCH_ERROR = '@@portfolios/FETCH_ERROR',
}

export interface PortfoliosState {
  lastFetched: Date,
  readonly loading: boolean,
  readonly entities: NormalizedState<Portfolio>,
  readonly errors?: string
}