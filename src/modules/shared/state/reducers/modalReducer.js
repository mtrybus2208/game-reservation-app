import { actionTypes } from '../actions/actionTypes';

const initialState = {
  modalType: null,
  modalProps: {},
  isLoading: false,
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type,
      };
    case actionTypes.HIDE_MODAL:
      return {
        modalType: null,
        modalProps: {},
      };
    case actionTypes.START_LOADING_MODAL:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.STOP_LOADING_MODAL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
