
export const getSessionState = state => state.sessionState;

export const getUiState = state => state.ui;

export const getAuthUser = state => {
  const { authUser } = getSessionState(state);
  return authUser;
};
