import { createSelector } from 'reselect';

export const getGameReservationState = state => state.gameReservationState;

export const getIsReservationBlocked = createSelector(
  getGameReservationState,
  gameReservationState => gameReservationState.isReservationBlocked,
);

export const getTimeAndType = createSelector(
  getGameReservationState,
  ({ gameType, time }) => ({
    gameType,
    time,
  }),
);
