import { call, takeLatest, put } from "redux-saga/effects";

import * as Api from '../services/Api'
import { fetchDividendsSuccess, fetchDividendsFailure, FETCH_DIVIDENDS_REQUEST } from '../actions/dividends'

function* fetchDividends(action) {
  try {
    const stockId = action.payload
    const dividends = yield call(Api.fetchDividends, stockId)
    yield put(fetchDividendsSuccess(dividends))
  } catch (e) {
    yield put(fetchDividendsFailure(e))
  }
}

function* dividendsSaga() {
  yield takeLatest(FETCH_DIVIDENDS_REQUEST, fetchDividends)
}

export default dividendsSaga