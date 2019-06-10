import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import {
  watchSocialAuthGoogle,
  watchSocialAuthGithub,
  watchSignOut,
} from './socialAuthSagas';

export default function* authSaga() {
  yield all([
    watchSocialAuthGoogle(),
    watchSocialAuthGithub(),
    watchSignOut(),
  ]);
}
