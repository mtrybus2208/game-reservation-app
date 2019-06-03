import { actionTypes } from './actionTypes';

export const setDirectChatMode = (chatMode) =>
  ({
    type: actionTypes.SET_DIRECT_CHAT_MODE,
    chatMode,
  });

export const setGlobalChatMode = () =>
  ({
    type: actionTypes.SET_GLOBAL_CHAT_MODE
  });
