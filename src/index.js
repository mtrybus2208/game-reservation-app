/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/**
 * TODO: Move createStoreWithMiddleware to separate file
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleWare from 'redux-promise';
import createSagaMiddleware from 'redux-saga';


import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { injectGlobal } from 'styled-components';
import WebFont from 'webfontloader';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { timeLineReducer } from './home/state/reducers';
import timeLineSaga from './home/state/sagas';

import bg from './assets/img/game-bg.png';

const history = createHistory();
const rootReducer = combineReducers({
  timeLine: timeLineReducer,
  router: routerReducer,
});
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

const enhancers = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f,
);
 

const store = createStore(
  rootReducer,
  enhancers,
);

sagaMiddleware.run(timeLineSaga);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

WebFont.load({
  google: {
    families: ['Roboto:400,500', 'sans-serif'],
  },
});

injectGlobal`body {
    margin: 0;
    padding: 0; 
    font-family: 'Roboto', sans-serif;
    color: #747a81;
    background: #141619;
  }
`;
