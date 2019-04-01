/* eslint no-use-before-define: 0 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { doSignInWithGoogle, doSignInWithGithub } from '@/services/firebase';
import { actionTypes } from './../actions/actionTypes';
import { mapUserData } from '../../helpers/mapUserData';

function* workSocialAuth(type) {
  const socialTypes = {
    google: doSignInWithGoogle,
    github: doSignInWithGithub,
  };

  try {
    const data = yield call(socialTypes[type]);
    const mappedUser = mapUserData(data.user);
    yield put({ type: actionTypes.SET_AUTH_USER, payload: mappedUser });
  } catch (e) {
    yield put({ type: actionTypes.SOCIAL_AUTH_FAIL, message: e.message });
  }
}

export function* watchSocialAuthGoogle() {
  yield takeEvery(actionTypes.SOCIAL_AUTH_GOOGLE, workSocialAuth, 'google');
}

export function* watchSocialAuthGithub() {
  yield takeEvery(actionTypes.SOCIAL_AUTH_GITHUB, workSocialAuth, 'github');
}
