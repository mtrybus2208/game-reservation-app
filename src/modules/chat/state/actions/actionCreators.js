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

export const addGlobalChatMessage = (message) =>
  ({
    type: actionTypes.ADD_GLOBAL_CHAT_MESSAGE,
    message,
  });

export const fetchDirectChatMessages = (directChatRoomId) => 
  ({ 
    type: actionTypes.FETCH_DIRECT_CHAT_MESSAGES,
    directChatRoomId,
  });
