/* eslint no-use-before-define: 0 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from './../actions/actionTypes';

/** This should be moved to separate API folder */
/**
 * from backend we will have array of games
 * we need to apply converter funtion to entieties
 * like below
 * 
 */
 
const fetchGames = (page) => (
  fetch(`http://localhost:9000/matches`)
    .then(response => response.json())
    .then(res => {
      const ent = res.reduce((obj, item) => ({
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
    })
);

/** This should be moved to separate API folder */

function* workFetchReservedGames() {
  try {
    const games = yield call(fetchGames);
    yield put({ type: actionTypes.FETCH_RESERVED_GAMES_SUCCESS, games });
  } catch (e) {
    yield put({ type: actionTypes.FETCH_RESERVED_GAMES_FAIL, message: e.message });
  }
}

function* workAddNewGame({ payload }) {
  // TODO: CHECK ON SERVER IF SOMEONE DOESN'T RESERVE GAME IN THE MEANTIME
  try {
    yield put({ type: actionTypes.ADD_NEW_GAME_SUCCESS, payload });
  } catch (e) {
    yield put({ type: actionTypes.ADD_NEW_GAME_FAIL, message: e.message });
  }
}

export function* watchFetchReservedGames() {
  yield takeEvery(actionTypes.FETCH_RESERVED_GAMES, workFetchReservedGames);
}

export function* watchAddNewGame() {
  yield takeEvery(actionTypes.ADD_NEW_GAME, workAddNewGame);
}

