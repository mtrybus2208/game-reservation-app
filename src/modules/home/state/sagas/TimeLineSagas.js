/* eslint no-use-before-define: 0 */
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { actionTypes } from './../actions/actionTypes';
import moment from 'moment';
import axios from 'axios';

const makeEntieties = arr => {
  console.log(arr)
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

const fetchGames = workdayStart => (
  fetch(`http://3.95.208.60/matches`)
    .then(res => res.json())
    .then((res) => res.filter(game =>
      moment(game.startDate).isAfter(moment(workdayStart))))
    .then(makeEntieties)
);

const fetchPlayers = () => (
  fetch(`http://3.95.208.60/players`)
    .then(res => res.json())
    .then(makeEntieties)
);

const reserveGame = data => {
  const { authUser, gameType, time, timeLine } = data;
  axios.post('http://3.95.208.60/matches', {
    startDate: '2019-06-10T19:15',
    endDate: '2019-06-10T19:30',
    playerID: authUser.uid,
    gameName: gameType.name,
  }, {
    headers: {
      'Auth-Id': authUser.uid,
    },
  });
};

function* workFetchReservedGames() {
  try {
    const { workdayStart } = yield select(state => state.timeLine);
    const games = yield call(fetchGames, workdayStart);
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
    const { authUser } = yield select(state => state.sessionState);
    const { gameType, time } = yield select(state => state.gameReservationState);
    const result = yield call(reserveGame, {
      authUser,
      gameType,
      time,
    });
    
    
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

