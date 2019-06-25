import { actionTypes } from '../actions/actionTypes';

const initialState = {
  // modalType: null,
  modalType: 'DELETE_GAME_MODAL',
  modalProps: {}
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type,
      }
    case actionTypes.HIDE_MODAL:
      return {
        modalType: null,
        modalProps: {},
      }
    default:
      return state;
  }
}
