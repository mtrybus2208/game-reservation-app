import * as actionTypes from './actionTypes';

export const toggleLeftSidebar = () =>
  ({
    type: actionTypes.TOGGLE_LEFT_SIDEBAR,
  });

export const setGlobalChatMode = () =>
  ({
    type: actionTypes.SET_GLOBAL_CHAT_MODE,
  });

export const setDirectChatMode = () =>
  ({
    type: actionTypes.SET_DIRECT_CHAT_MODE,
  });
