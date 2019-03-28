import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import {
  watchSocialAuthGoogle,
} from './authSagas';

export default function* authSaga() {
  console.log('hej');
  yield all([
    watchSocialAuthGoogle(),
  ]);
}



// export * from './authSagas';