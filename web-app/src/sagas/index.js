import { all, fork } from 'redux-saga/effects'

import  stocksSaga  from './stocks'

function* rootSaga() {
  yield all([
    fork(stocksSaga)
  ])
}

export default rootSaga