import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { injectGlobal } from 'styled-components';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { timeLineReducer } from './scenes/TimeLineBoard/reducers';

import bg from './assets/img/game-bg.png';

const history = createHistory();
const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  timeLine: timeLineReducer,
  router: routerReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(middleware, thunk),
  )
); 

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

injectGlobal`
  body {
    background-image: url(${bg}); 
    margin: 0;
    padding: 0; 
    font-family: 'Roboto', sans-serif;
    color: #f2f2f2;
    overflow-y: scroll;
  }
`
