
import { call, takeLatest, put } from "redux-saga/effects";

import * as Api from '../services/Api'
import { fetchStocksSuccess, fetchStocksFailure, FETCH_STOCKS_REQUEST } from '../actions/stocks'

function* fetchStocks() {
  try {
    const stocks = yield call(Api.fetchStocks)
    yield put(fetchStocksSuccess(stocks))
  } catch (e) {
    yield put(fetchStocksFailure(e))
  }
}

function* stocksSaga() {
  yield takeLatest(FETCH_STOCKS_REQUEST, fetchStocks)
}

export default stocksSaga