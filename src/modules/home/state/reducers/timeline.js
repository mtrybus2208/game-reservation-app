import moment from 'moment';
import { removeKeyInObj } from '@/helpers/dataManipulation';
import { actionTypes } from './../actions/actionTypes';

const initialState = {
  endLastReservation: moment('10:00 am', 'HH:mm a'),
  actualTime: moment(),
  workdayStart: moment('10:00 am', 'HH:mm a'),
  workdayEnd: moment('11:00 pm', 'HH:mm a'),
  gameConfigOpen: false,
  timeConverter: 12,
  entities: null,
  currentReservationTime: null,
  players: null,
  isAddGameFetching: false,
  isDeleteGameFetching: false,
  reservedGames: [],
};

const addNewGameSuccess = (state, action) => (
  {
    ...state,
    isAddGameFetching: false,
    reservedGames: {
      ...state.reservedGames,
      byID: {
        ...state.reservedGames.byID,
        ...action.payload.byID,
      },
      allIds: [
        ...state.reservedGames.allIds,
        ...action.payload.allIds,
      ],
    },
  }
);

const deleteGameSuccess = (state, action) => {
  const byID = (removeKeyInObj(state.reservedGames.byID, action.payload.gameId)).toString();
  const allIds = state.reservedGames.allIds.filter(item => item !== action.payload.gameId);
  return (
    {
      ...state,
      isDeleteGameFetching: false,
      reservedGames: {
        ...state.reservedGames,
        byID,
        allIds,
      },
    }
  );
}

export const timeLineReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_GAME:
      return {
        ...state,
        isAddGameFetching: true,
      };
    case actionTypes.ADD_NEW_GAME_SUCCESS:
      return addNewGameSuccess(state, action);
    case actionTypes.ADD_NEW_GAME_FAIL:
      return {
        ...state,
        isAddGameFetching: false,
      };

    case actionTypes.DELETE_GAME:
      return {
        ...state,
        isDeleteGameFetching: true,
      };
      
    case actionTypes.DELETE_GAME_SUCCESS:
      return deleteGameSuccess(state, action);

    case actionTypes.DELETE_GAME_FAIL:
      return {
        ...state,
        isDeleteGameFetching: false,
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
        reservedGames: [],
      };
    case actionTypes.FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        players: action.players,
      };
    case actionTypes.FETCH_PLAYERS_FAIL:
      return {
        ...state,
        players: null,
      };

    case actionTypes.ZOOM_TIMELINE: {
      return {
        ...state,
        timeConverter: action.payload,
      };
    }
    case actionTypes.SET_CURRENT_RESERVATION_TIME: {
      return {
        ...state,
        currentReservationTime: action.payload,
      };
    }
    default:
      return state;
  }
};
