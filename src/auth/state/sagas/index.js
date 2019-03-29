import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import {
  watchSocialAuthGoogle,
  watchSocialAuthGithub,
} from './authSagas';

export default function* authSaga() {
  console.log('hej');
  yield all([
    watchSocialAuthGoogle(),
    watchSocialAuthGithub(),
  ]);
}
