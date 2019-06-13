/* eslint no-use-before-define: 0 */
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { actionTypes } from './../actions/actionTypes';
import {
  getReservationInHours,
  getHoursFromPixels,
} from '@/modules/home/state/selectors';
import moment from 'moment';
import axios from 'axios';

const createFullDateFromHours = h => `${moment().format('YYYY-MM-DD')}T${h}`;

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
  axios.post('http://3.95.208.60/matches', data, {
    headers: {
      'Auth-Id': data.playerID,
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
  //  TODO: this should be unified, we must store in reducer only date format
  try {
    const state = yield select();
    const { sessionState, gameReservationState } = state;
    const startDate = createFullDateFromHours(getHoursFromPixels(state));
    const endDate = createFullDateFromHours(moment(startDate).add(gameReservationState.time.duration, 'm').format('HH:mm'));
    yield call(reserveGame, {
      startDate,
      endDate,
      playerID: sessionState.authUser.uid,
      gameName: gameReservationState.gameType.name,
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

