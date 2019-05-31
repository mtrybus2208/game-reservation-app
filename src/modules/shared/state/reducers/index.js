import { actionTypes } from '../actions/actionTypes';

export const initialState = {
  leftSidebarOpened: false,
  rightSidebarOpened: false,
  modalOpened: false,
  modalName: '',
  chatMode: 'GLOBAL',
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_LEFT_SIDEBAR:
      return {
        ...state,
        leftSidebarOpened: action.visible,
      };
    case actionTypes.SET_GLOBAL_CHAT_MODE:
      return {
        ...state,
        chatMode: 'GLOBAL',
      };
    case actionTypes.SET_DIRECT_CHAT_MODE:
      return {
        ...state,
        chatMode: action.chatMode,
      };
    default:
      return state;
  }
};
