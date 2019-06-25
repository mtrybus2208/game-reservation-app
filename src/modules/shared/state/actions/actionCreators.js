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

export const showModal = ({ modalProps, modalType }) =>
  ({
    type: actionTypes.SHOW_MODAL,
    modalProps,
    modalType,
  });

export const hideModal = () =>
  ({
    type: actionTypes.HIDE_MODAL,
  });
