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
  fetch(`https://jsonplaceholder.typicode.com/todos/${page}`)
    .then(response => response.json())
    .then(res => {
      return ({
        users: {
          byId: {
            lkqjwhdkljh293832213123321: {
              id: 'lkqjwhdkljh293832213123321',
              displayName: 'John Smith',
              email: 'some@email.com',
              photoUrl: 'https://res.cloudinary.com/duo6ruqkc/image/upload/v1550848181/child_rtmjgd.png',
            },
            asdf: {
              id: 'asdf',
              displayName: 'Bill Murray',
              email: 'bill@email.com',
              photoUrl: 'https://res.cloudinary.com/duo6ruqkc/image/upload/v1550848181/child_rtmjgd.png',
            },
            gtyhujik: {
              id: 'gtyhujik',
              displayName: 'Jack None',
              email: 'jack@email.com',
              photoUrl: 'https://res.cloudinary.com/duo6ruqkc/image/upload/v1550848181/child_rtmjgd.png',
            },
          },
          allIds: [
            'lkqjwhdkljh293832213123321',
            'asdf',
            'gtyhujik',
          ],
        },
        reservedGames: {
          byId: {
            1: {
              id: '1',
              user: 'lkqjwhdkljh293832213123321',
              startDate: '2018-01-01T14:10:27.00Z',
              endDate: '2018-01-02T14:11:27.00Z',
              matchStatus: 'RESERVED',
              gametypeId: '1',
            },
            2: {
              id: '2',
              user: 'asdf',
              startDate: '2018-01-01T14:10:27.00Z',
              endDate: '2018-01-02T14:11:27.00Z',
              matchStatus: 'RESERVED',
              gametypeId: '2',
            },
            3: {
              id: '3',
              user: 'gtyhujik',
              startDate: '2018-01-01T14:10:27.00Z',
              endDate: '2018-01-02T14:11:27.00Z',
              matchStatus: 'RESERVED',
              gametypeId: '1',
            },
          },
          allIds: [1, 2, 3],
        },
        gameTypes: {
          byId: {
            1: {
              id: '1',
              name: 'fifa 19',
            },
            2: {
              id: '2',
              name: 'mortal combat',
            },
          },
          allIds: [
            [1, 2],
          ],
        },
        userGames: {
          byId: {
            1: {
              id: 1,
              userId: 'lkqjwhdkljh293832213123321',
              gameId: '1',
            },
            2: {
              id: 2,
              userId: 'asdf',
              gameId: '43',
            },
          },
          allIds: [1, 2],
        },
      });
    })
);

/** This should be moved to separate API folder */

function* workFetchReservedGames() {
  try {
    const games = yield call(fetchGames, 1);
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

