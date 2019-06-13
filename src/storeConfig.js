/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleWare from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { throttled } from './helpers'; 
import { loadState, saveState } from './helpers/localstorage';
import { timeLineReducer, gameReservationReducer } from './modules/home/state/reducers';
import { uiReducer } from './modules/shared/state/reducers';
import { messageReducer, sessionReducer } from './modules/auth/state/reducers';
import { chatReducer } from './modules/chat/state/reducers';
import timeLineSaga from './modules/home/state/sagas/';
import chatSaga from './modules/chat/state/sagas/';
import authSaga from './modules/auth/state/sagas/';
import uiSaga from './modules/shared/state/sagas/';
 
export default function configureStore(history) {
  const persistedState = loadState();
  const rootReducer = combineReducers({
    timeLine: timeLineReducer,
    router: connectRouter(history),
    ui: uiReducer,
    messageState: messageReducer,
    sessionState: sessionReducer,
    gameReservationState: gameReservationReducer,
    chat: chatReducer,
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
    persistedState,
    enhancers,
  );

  [authSaga, timeLineSaga, uiSaga, chatSaga]
    .map(saga => sagaMiddleware.run(saga));

  store.subscribe(throttled(500, () => {
    saveState({
      sessionState: store.getState().sessionState,
    });
  }));

  return store;
}