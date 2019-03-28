/* eslint no-use-before-define: 0 */
import { call, put, takeEvery } from 'redux-saga/effects';
import { doSignInWithGoogle, doSignInWithGithub } from '@/services/firebase';
import { actionTypes } from './../actions/actionTypes';

function* workSocialAuthGoogle() {
    console.log('asd')
  try {
    const user = yield call(doSignInWithGoogle);
    yield put({ type: actionTypes.SOCIAL_AUTH_SUCCESS, user });
  } catch (e) {
    yield put({ type: actionTypes.SOCIAL_AUTH_FAIL, message: e.message });
  }
}

export function* watchSocialAuthGoogle() {
  yield takeEvery(actionTypes.SOCIAL_AUTH_GOOGLE, workSocialAuthGoogle);
}

