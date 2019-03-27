import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import WebFont from 'webfontloader';
import Firebase, { FirebaseContext } from '@/components/Firebase';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './storeConfig';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App history={history} />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

WebFont.load({
  google: {
    families: ['Roboto:400,500', 'sans-serif'],
  },
});
