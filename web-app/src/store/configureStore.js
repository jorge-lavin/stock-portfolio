import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
      )
    )  
  )

  sagaMiddleware.run(rootSaga)

  return store;
}