import moment from 'moment';
import * as actionTypes from './../actions/actionTypes';

export const initialState = {
  endLastReservation: moment('09:00 am', 'HH:mm a'),
  actualTime: moment(),
  workdayStart: moment('08:00 am', 'HH:mm a'),
  workdayEnd: moment('24:00 pm', 'HH:mm a'),
  gameConfigOpen: false,
  timeConverter: 12,
  games: [
    {
      type: 'fifa',
      player1: 'random',
      player2: 'random',
      isNotPermitted: false,
      start: moment('08:00 am', 'HH:mm a'),
      end: moment('08:30 am', 'HH:mm a'),
    },
  ],
};

export const timeLineReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAME_TIME:
      return {
        ...state,
        endLastReservation: state.endLastReservation.add(action.payload.time, 'm'),
      };
    case actionTypes.CHANGE_GAME_CONFIG_STATE:
      return {
        ...state,
        gameConfigOpen: action.payload,
      };
    default:
      return state;
  }
};
