import { actionTypes } from '../actions/actionTypes';

export const initialState = {
  chatMode: 'GLOBAL',
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
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
