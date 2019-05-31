import { actionTypes } from './actionTypes';

export const toggleLeftSidebar = (visible) =>
  ({
    type: actionTypes.TOGGLE_LEFT_SIDEBAR,
    visible,
  });

export const closeChatWithRedirect = (path) =>
  ({
    type: actionTypes.CLOSE_CHAT_WITH_REDIRECT,
    path,
  });

export const setDirectChatMode = (chatMode) =>
  ({
    type: actionTypes.SET_DIRECT_CHAT_MODE,
    chatMode,
  });

export const setGlobalChatMode = () =>
  ({
    type: actionTypes.SET_GLOBAL_CHAT_MODE
  });


