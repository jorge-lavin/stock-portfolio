import NormalizedState from '../NormalizedObjects'

export interface Sector {
  sectorId: string;
  name: string;
}

export type ApiResponse = Record<string, any>

export enum SectorsActionTypes {
  FETCH_REQUEST = '@@sectors/FETCH_REQUEST',
  FETCH_SUCCESS = '@@sectors/FETCH_SUCCESS',
  FETCH_ERROR = '@@sectors/FETCH_ERROR',
}

export interface SectorsState {
  lastFetched: Date,
  readonly loading: boolean,
  readonly entities: NormalizedState<Sector>,
  readonly errors?: string
}