export const FETCH_DIVIDENDS_REQUEST = '@@dividends/FETCH_DIVIDENDS_REQUEST'
export const FETCH_DIVIDENDS_SUCCESS = '@@dividends/FETCH_DIVIDENDS_SUCCESS'
export const FETCH_DIVIDENDS_FAILURE = '@@dividends/FETCH_DIVIDENDS_FAILURE'

export const fetchDividendsRequest = (stockId) => ({
  type: FETCH_DIVIDENDS_REQUEST,
  payload: stockId
})

export const fetchDividendsSuccess = (dividends) => ({
  type: FETCH_DIVIDENDS_SUCCESS,
  payload: dividends
})

export const fetchDividendsFailure = (err) => ({
  type: FETCH_DIVIDENDS_FAILURE,
  payload: err
})