import { actionTypes } from './actionTypes';

export const addNewGame = payload =>
  ({
    type: actionTypes.ADD_NEW_GAME,
    payload,
  });

export const deleteGame = payload =>
  ({
    type: actionTypes.DELETE_GAME,
    payload,
  });

export const changeGameConfigState = payload =>
  ({
    type: actionTypes.CHANGE_GAME_CONFIG_STATE,
    payload,
  });

export const fetchReservedGames = () => ({ type: actionTypes.FETCH_RESERVED_GAMES });

export const fetchPlayers = () => ({ type: actionTypes.FETCH_PLAYERS });

export const setGameType = payload =>
  ({
    type: actionTypes.SET_GAME_TYPE,
    payload,
  });

export const setGameTime = payload =>
  ({
    type: actionTypes.SET_GAME_TIME,
    payload,
  });

export const zoomTimeLine = payload =>
  ({
    type: actionTypes.ZOOM_TIMELINE,
    payload,
  });

export const setCurrentReservationTime = payload =>
  ({
    type: actionTypes.SET_CURRENT_RESERVATION_TIME,
    payload,
  });

export const hideUserReservationCard = () =>
  ({
    type: actionTypes.HIDE_USER_RESERVATION_CARD,
  });

