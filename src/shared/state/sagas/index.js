import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import {
  watchCloseChatWithRedirect,
} from './uiSagas';

export default function* uiSaga() {
  yield all([
    watchCloseChatWithRedirect(),
  ]);
}