import { actionTypes } from '../actions/actionTypes';

const INITIAL_STATE = {
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
    default:
      return state;
  }
};
