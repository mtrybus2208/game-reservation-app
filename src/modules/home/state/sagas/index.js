import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import {
  watchFetchReservedGames,
  watchAddNewGame,
  watchFetchPlayers,
} from './TimeLineSagas';

export default function* timeLineSaga() {
  yield all([
    watchFetchPlayers(),
    watchFetchReservedGames(),
    watchAddNewGame(),
  ]);
}