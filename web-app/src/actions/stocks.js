export const FETCH_STOCKS_REQUEST = '@@stocks/FETCH_STOCKS_REQUEST'
export const FETCH_STOCKS_SUCCESS = '@@stocks/FETCH_STOCKS_SUCCESS'
export const FETCH_STOCKS_FAILURE = '@@stocks/FETCH_STOCKS_FAILURE'

export const FETCH_STOCK_REQUEST = '@@stocks/FETCH_STOCK_REQUEST'
export const FETCH_STOCK_SUCCESS = '@@stocks/FETCH_STOCK_SUCCESS'
export const FETCH_STOCK_FAILURE = '@@stocks/FETCH_STOCK_FAILURE'


export const fetchStocksRequest = () => ({
  type: FETCH_STOCKS_REQUEST
})

export const fetchStocksSuccess = (stocks) => ({
  type: FETCH_STOCKS_SUCCESS,
  payload: stocks
})

export const fetchStocksFailure = (err) => ({
  type: FETCH_STOCKS_FAILURE,
  payload: err
})
