/* eslint no-use-before-define: 0 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { actionTypes } from './../actions/actionTypes';
import { actionTypes as actionTypesHome } from '@/modules/home/state/actions/actionTypes';

function* workCloseChatWithRedirect({ path }) {
  yield put(push(path));
  yield put({ type: actionTypes.TOGGLE_LEFT_SIDEBAR, visible: false });
  yield put({ type: actionTypesHome.RESET_GAME_SETTINGS });
}

export function* watchCloseChatWithRedirect() {
  yield takeEvery(actionTypes.CLOSE_CHAT_WITH_REDIRECT, workCloseChatWithRedirect);
}

