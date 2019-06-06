/* eslint no-use-before-define: 0 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from './../actions/actionTypes';

const makeEntieties = arr => {
  const ent = arr.reduce((obj, item) => ({
    ...obj,
    byID: {
      ...obj.byID,
      [item.id]: item,
    },
    allIds: [
      ...obj.allIds,
      ...[item.id],
    ],
  }), { byID: {}, allIds: [] });
  return ent;
};

const fetchGames = () => (
  fetch(`http://3.95.208.60/matches`)
    .then(response => response.json())
    .then(makeEntieties)
);

const fetchPlayers = () => (
  fetch(`http://3.95.208.60/players`)
    .then(response => response.json())
    .then(makeEntieties)
);

function* workFetchReservedGames() {
  try {
    const games = yield call(fetchGames);
    const players = yield call(fetchPlayers);
    yield put({ type: actionTypes.FETCH_PLAYERS, players });
    yield put({ type: actionTypes.FETCH_RESERVED_GAMES_SUCCESS, games });

  } catch (e) {
    yield put({ type: actionTypes.FETCH_RESERVED_GAMES_FAIL, message: e.message });
  }
}

function* workFetchPlayers() {
  try {
    const players = yield call(fetchPlayers);
    yield put({ type: actionTypes.FETCH_PLAYERS_SUCCESS, players });
  } catch (e) {
    yield put({ type: actionTypes.FETCH_PLAYERS_FAIL, message: e.message });
  }
}

function* workAddNewGame({ payload }) {
  try {
    yield put({ type: actionTypes.ADD_NEW_GAME_SUCCESS, payload });
  } catch (e) {
    yield put({ type: actionTypes.ADD_NEW_GAME_FAIL, message: e.message });
  }
}

export function* watchFetchReservedGames() {
  yield takeEvery(actionTypes.FETCH_RESERVED_GAMES, workFetchReservedGames);
}

export function* watchFetchPlayers() {
  yield takeEvery(actionTypes.FETCH_PLAYERS, workFetchPlayers);
}

export function* watchAddNewGame() {
  yield takeEvery(actionTypes.ADD_NEW_GAME, workAddNewGame);
}

