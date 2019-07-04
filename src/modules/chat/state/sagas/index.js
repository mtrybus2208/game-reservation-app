import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import {
  watchFetchDirectChatMessages
} from './ChatSagas';

export default function* chatSaga() {
  yield all([
    watchFetchDirectChatMessages(),
  ]);
}