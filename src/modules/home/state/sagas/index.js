import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import {
  watchFetchReservedGames,
  watchAddNewGame,
} from './TimeLineSagas';

export default function* timeLineSaga() {
  yield all([
    watchFetchReservedGames(),
    watchAddNewGame(),
  ]);
}