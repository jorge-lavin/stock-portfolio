import { all, fork } from 'redux-saga/effects'

import stocksSaga  from './stocks'
import dividendsSaga from './dividends'

function* rootSaga() {
  yield all([
    fork(stocksSaga), fork(dividendsSaga)
  ])
}

export default rootSaga