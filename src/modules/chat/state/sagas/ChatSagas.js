/* eslint no-use-before-define: 0 */
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { actionTypes } from './../actions/actionTypes';

const makeEntities = chatRoomMessages => {
  const chatRoomEntity = chatRoomMessages.reduce((messages, message) => ({
      ...messages,
      [message.chatRoomId]: [
        ...(messages[message.chatRoomId] || []), 
        message
      ],
  }), {});
  
  return chatRoomEntity;
};

const fetchDirectChatMessages = (directChatRoomId) => (
  fetch(`http://localhost/chat/direct/messages/chat-room/${directChatRoomId}`)
    .then(response => response.json())
    .then(makeEntities)
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