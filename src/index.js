/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { injectGlobal } from 'styled-components';
import WebFont from 'webfontloader';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { homeReducer } from './home/state/reducers';
import { uiReducer } from './shared/state/reducers';

import bg from './assets/img/game-bg.png';

const history = createHistory();
const middleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  timeLine: homeReducer,
  router: routerReducer,
  ui: uiReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middleware, thunk)),
);

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
    /* background-image: url(${bg});  */
    margin: 0;
    padding: 0; 
    font-family: 'Roboto', sans-serif;
    color: #747a81;
    background: #141619;
  }
`;
