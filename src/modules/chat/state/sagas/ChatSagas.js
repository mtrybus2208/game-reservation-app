/* eslint no-use-before-define: 0 */
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { actionTypes } from './../actions/actionTypes';
import moment from 'moment';
import axios from 'axios';

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

const fetchDirectChatMessages = (directChatRoomId) => (
  fetch(`http://localhost/chat/direct/messages/chat-room/${directChatRoomId}`)
    .then(res => res.json())
    .then(makeEntieties)
);

function* workFetchDirectChatMessages({ directChatRoomId }) {
  try {
    const messages = yield call(fetchDirectChatMessages, directChatRoomId);
    yield put({ type: actionTypes.FETCH_DIRECT_CHAT_MESSAGES_SUCCESS, messages });
  } catch (e) {
    yield put({ type: actionTypes.FETCH_DIRECT_CHAT_MESSAGES_FAIL, message: e.message });
  }
}

export function* watchFetchDirectChatMessages() {
  yield takeEvery(actionTypes.FETCH_DIRECT_CHAT_MESSAGES, workFetchDirectChatMessages);
}