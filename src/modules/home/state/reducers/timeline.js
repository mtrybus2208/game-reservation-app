import moment from 'moment';
import { actionTypes } from './../actions/actionTypes';

const initialState = {
  endLastReservation: moment('10:00 am', 'HH:mm a'),
  actualTime: moment(),
  workdayStart: moment('10:00 am', 'HH:mm a'),
  workdayEnd: moment('05:00 pm', 'HH:mm a'),
  gameConfigOpen: false,
  timeConverter: 12,
  entities: null,
};

export const timeLineReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_GAME_SUCCESS:
      return {
        ...state,
        endLastReservation: state.endLastReservation.add(action.payload.time.duration, 'm'),
      };
    case actionTypes.CHANGE_GAME_CONFIG_STATE:
      return {
        ...state,
        gameConfigOpen: action.payload,
      };
    case actionTypes.FETCH_RESERVED_GAMES_SUCCESS:
      return {
        ...state,
        reservedGames: action.games,
      };
    case actionTypes.FETCH_RESERVED_GAMES_FAIL:
      return {
        ...state,
        reservedGames: null,
      };

    case actionTypes.ZOOM_TIMELINE: {
      return {
        ...state,
        timeConverter: action.payload,
      };
    }
    default:
      return state;
  }
};
