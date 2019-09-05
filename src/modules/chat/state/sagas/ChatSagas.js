/* eslint no-use-before-define: 0 */
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { actionTypes } from './../actions/actionTypes';
import { API_URL } from '@/constants/api';

const makeEntities = chatRoomMessages => {
  const chatRoomEntity = chatRoomMessages.reduce((messages, message) => ({
      ...messages,
      [message.chatRoomId]: [ 
        message,
        ...(messages[message.chatRoomId] || [])
      ],
  }), {});

  return chatRoomEntity;
};

const fetchDirectChatMessages = (directChatRoomId, firstElementNumber, numberOfElements) => (
  fetch(`${API_URL}/chat/direct/messages/chat-room/${directChatRoomId}?firstElementNumber=${firstElementNumber}&numberOfElements=${numberOfElements}`)
    .then(response => response.json())
    .then(makeEntities)
);

function* workFetchDirectChatMessages({ directChatRoomId, firstElementNumber, numberOfElements }) {
  try {
    const messages = yield call(fetchDirectChatMessages, directChatRoomId, firstElementNumber, numberOfElements);
    yield put({ type: actionTypes.FETCH_DIRECT_CHAT_MESSAGES_SUCCESS, messages });
  } catch (e) {
    yield put({ type: actionTypes.FETCH_DIRECT_CHAT_MESSAGES_FAIL, message: e.message });
  }
}

export function* watchFetchDirectChatMessages() {
  yield takeEvery(actionTypes.FETCH_DIRECT_CHAT_MESSAGES, workFetchDirectChatMessages);
}