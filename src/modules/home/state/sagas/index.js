import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import {
  watchFetchReservedGames,
} from './TimeLineSagas';

export default function* timeLineSaga() {
  yield all([
    watchFetchReservedGames(),
  ]);
}