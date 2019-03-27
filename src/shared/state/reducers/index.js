import * as actionTypes from './../actions/actionTypes';

export const initialState = {
  leftSidebarOpened: false,
  rightSidebarOpened: false,
  modalOpened: false,
  modalName: '',
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_LEFT_SIDEBAR:
      return {
        ...state,
        leftSidebarOpened: !state.leftSidebarOpened,
      };
    default:
      return state;
  }
};
