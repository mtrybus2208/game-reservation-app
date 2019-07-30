import { actionTypes } from '../actions/actionTypes';

const INITIAL_STATE = {
  isReservationBlocked: true,
  editMode: false,
  gameType: null,
  time: null,
};

export const gameReservationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_GAME_TYPE: {
      return {
        ...state,
        gameType: {
          ...action.payload,
        },
        editMode: true,
      };
    }
    case actionTypes.SET_GAME_TIME: {
      return {
        ...state,
        time: {
          ...action.payload,
        },
        editMode: true,
      };
    }
    case actionTypes.HIDE_USER_RESERVATION_CARD: {
      return {
        ...state,
        editMode: false,
      };
    }
    case actionTypes.RESET_GAME_SETTINGS: {
      return {
        ...state,
        editMode: false,
        gameType: null,
        time: null,
      };
    }
    case actionTypes.SET_RESERVATION_PERMISSION: {
      return {
        ...state,
        isReservationBlocked: action.payload,
      };
    }
    default:
      return state;
  }
};
