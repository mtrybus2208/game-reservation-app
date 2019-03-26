import * as actionTypes from './../actions/actionTypes';

export const initialState = {
  leftSidebarOpened: false,
  rightSidebarOpened: false,
  modalOpened: false,
  modalName: '',
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_LEFT_SIDEBAR:
      return {
        ...state,
        leftSidebarOpened: true,
      };
    case actionTypes.CLOSE_LEFT_SIDEBAR:
      return {
        ...state,
        leftSidebarOpened: false,
      };
    default:
      return state;
  }
};
