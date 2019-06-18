import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import {
  watchSocialLogin,
  watchSignOut,
  watchRemoveUserData,
} from './socialAuthSagas';

export default function* authSaga() {
  yield all([
    watchSocialLogin(),
    watchSignOut(),
    watchRemoveUserData(),
  ]);
}
