import { actionTypes } from '../actions/actionTypes';

export const initialState = {
  chatMode: 'GLOBAL',
  globalChatMessages: [],
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
    case actionTypes.ADD_GLOBAL_CHAT_MESSAGE:
      return {
        ...state,
        globalChatMessages: [...state.globalChatMessages, action.message],
      };
    default:
      return state; 
  }
};
