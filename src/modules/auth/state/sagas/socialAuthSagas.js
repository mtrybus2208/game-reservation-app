/* eslint no-use-before-define: 0 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { doSignInWithGoogle, doSignInWithGithub, signOut } from '@/services/firebase';
import { actionTypes as uiActionTypes } from '@/modules/shared/state/actions/actionTypes';
import * as ROUTES from '@/constants/routes';
import { removeItem } from '@/helpers/localstorage';
import { actionTypes } from './../actions/actionTypes';
import { mapUserData } from '../../helpers/mapUserData';
import axios from 'axios';

const playerSaveLink = 'http://3.95.208.60/players';

function* workSocialAuth(type) {
  const socialTypes = {
    google: doSignInWithGoogle,
    github: doSignInWithGithub,
  };

  try {
    const data = yield call(socialTypes[type]);
    const mappedUser = mapUserData(data.user);
    
    yield put({ type: actionTypes.SET_AUTH_USER, payload: mappedUser });
    yield put({ type: uiActionTypes.CLOSE_CHAT_WITH_REDIRECT, path: ROUTES.HOME });
    yield call(savePlayer(mappedUser));
    yield call(removeItem('state'));
  } catch (e) {
    yield put({ type: actionTypes.SOCIAL_AUTH_FAIL, message: e.message });
  }
}

function* workSignOut() {
  try {
    yield call(signOut);
    yield put({ type: actionTypes.SET_AUTH_USER, payload: null });
    yield put({ type: uiActionTypes.CLOSE_CHAT_WITH_REDIRECT, path: ROUTES.LOGIN });
  } catch (e) {
    yield put({ type: actionTypes.SIGN_OUT_FAIL });
  }
}

export function* watchSocialAuthGoogle() {
  yield takeEvery(actionTypes.SOCIAL_AUTH_GOOGLE, workSocialAuth, 'google');
}

export function* watchSocialAuthGithub() {
  yield takeEvery(actionTypes.SOCIAL_AUTH_GITHUB, workSocialAuth, 'github');
}

export function* watchSignOut() {
  yield takeEvery(actionTypes.SIGN_OUT, workSignOut);
}

function savePlayer(mappedUser) {
  const playerRequestBody = buildPlayerCreateRequestBody(mappedUser);

  axios.post(playerSaveLink, playerRequestBody);
}

function buildPlayerCreateRequestBody(mappedUser) {
  return JSON.parse(
    `{
      "id": "${mappedUser.uid}",
      "email": "${mappedUser.email}",
      "displayName": "${mappedUser.displayName}",
      "photoUrl": "${mappedUser.photoURL}"
    }`,
  );
}
