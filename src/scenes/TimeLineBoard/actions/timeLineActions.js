import * as actionTypes from './actionTypes';

export const setGameTime = (payload) =>
  ({
    type: actionTypes.SET_GAME_TIME,
    payload,
  });

export const changeGameConfigState = (payload) =>
  ({
    type: actionTypes.CHANGE_GAME_CONFIG_STATE,
    payload,
  });