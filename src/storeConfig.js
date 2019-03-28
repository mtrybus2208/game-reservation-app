/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleWare from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { timeLineReducer } from './home/state/reducers';
import { uiReducer } from './shared/state/reducers';
import { messageReducer, sessionReducer } from './auth/state/reducers';
import timeLineSaga from './home/state/sagas/';
import authSaga from './auth/state/sagas/';

export default function configureStore(history) {
  const rootReducer = combineReducers({
    timeLine: timeLineReducer,
    router: routerReducer,
    ui: uiReducer,
    messageState: messageReducer,
    sessionState: sessionReducer,
  });

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : f => f,
  );

  const store = createStore(
    rootReducer,
    enhancers,
  );

  sagaMiddleware.run(authSaga);

  return store;
}