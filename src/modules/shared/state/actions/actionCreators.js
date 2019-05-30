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

export const setChatMode = (playerId) =>
  ({
    type: actionTypes.SET_CHAT_MODE,
    playerId,
  });

