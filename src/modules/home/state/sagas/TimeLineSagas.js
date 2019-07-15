/* eslint no-use-before-define: 0 */
import { call, put, takeEvery, select } from 'redux-saga/effects';
import moment from 'moment';
import axios from 'axios';
import { getHoursFromPixels } from '@/modules/home/state/selectors';
import { actionTypes as actionSharedTypes } from '@/modules/shared/state/actions/actionTypes';
import { API_URL } from '@/constants/api';
import { actionTypes } from './../actions/actionTypes';

const createFullDateFromHours = h => `${moment().format('YYYY-MM-DD')}T${h}`;

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

const fetchGames = workdayStart => (
  fetch(`${API_URL}/matches`)
    .then(res => res.json())
    .then((res) => res.filter(game =>
      moment(game.startDate).isAfter(moment(workdayStart))))
    .then(makeEntieties)
);

const fetchPlayers = () => (
  fetch(`${API_URL}/players`)
    .then(res => res.json())
    .then(makeEntieties)
);

const reserveGame = data => {
  return axios.post(`${API_URL}/matches`, data, {
    headers: {
      'Auth-Id': data.playerID,
    },
  });
};

const deleteGame = data => (
  axios.delete(`${API_URL}/matches/${data.gameId}`, {
    headers: {
      'Auth-Id': data.userId,
    },
  })
);

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
    const { data } = yield call(reserveGame, {
      startDate,
      endDate,
      playerID: sessionState.authUser.uid,
      gameName: gameReservationState.gameType.name,
    });

    const reservedGames = yield call(makeEntieties, [data]);
    yield put({ type: actionTypes.ADD_NEW_GAME_SUCCESS, payload: reservedGames });
    yield put({ type: actionTypes.HIDE_USER_RESERVATION_CARD });
    yield put({ type: actionSharedTypes.HIDE_MODAL });
  } catch (e) {
    yield put({ type: actionTypes.ADD_NEW_GAME_FAIL, message: e.message });
  }
}

function* workDeleteGame({ payload }) {
  try {
    const { authUser } = yield select(state => state.sessionState);
    const data = {
      gameId: payload,
      userId: authUser.uid,
    };
 
    yield call(deleteGame, data);
    yield put({ type: actionTypes.DELETE_GAME_SUCCESS, payload: data });
    yield put({ type: actionSharedTypes.HIDE_MODAL });
  } catch (e) {
    yield put({ type: actionTypes.DELETE_GAME_FAIL, message: e.message });
    yield put({ type: actionSharedTypes.HIDE_MODAL });
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

export function* watchDeleteGame() {
  yield takeEvery(actionTypes.DELETE_GAME, workDeleteGame);
}
 
