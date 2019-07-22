import { createSelector } from 'reselect';

export const getSessionState = state => state.sessionState;

export const getUiState = state => state.ui;

export const getAuthUser = createSelector(
  getSessionState,
  ({ authUser }) => authUser,
);
