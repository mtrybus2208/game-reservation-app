import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';

import {
  watchFetchReservedGames,
  watchAddNewGame,
  watchFetchPlayers,
  watchDeleteGame,
} from './TimeLineSagas';

export default function* timeLineSaga() {
  yield all([
    watchFetchPlayers(),
    watchFetchReservedGames(),
    watchAddNewGame(),
    watchDeleteGame(),
  ]);
}
