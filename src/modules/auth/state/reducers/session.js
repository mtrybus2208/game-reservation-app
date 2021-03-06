import { actionTypes } from '../actions/actionTypes';

const INITIAL_STATE = {
  authUser: null,
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.payload,
});

export const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH_USER: {
      return applySetAuthUser(state, action);
    }
    default:
      return state;
  }
};
