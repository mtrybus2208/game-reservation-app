import { actionTypes } from './actionTypes';

export const addNewGame = (payload) =>
  ({
    type: actionTypes.ADD_NEW_GAME,
    payload,
  });

export const changeGameConfigState = (payload) =>
  ({
    type: actionTypes.CHANGE_GAME_CONFIG_STATE,
    payload,
  });

export const fetchReservedGames = () => ({ type: actionTypes.FETCH_RESERVED_GAMES });
