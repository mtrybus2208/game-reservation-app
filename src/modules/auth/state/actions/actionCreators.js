import { actionTypes } from './actionTypes';

export const socialAuthGoogle = (payload) =>
  ({
    type: actionTypes.SOCIAL_AUTH_GOOGLE,
    payload,
  });

export const socialAuthGithub = (payload) =>
  ({
    type: actionTypes.SOCIAL_AUTH_GITHUB,
    payload,
  });

export const socialAuthSuccess = (payload) =>
  ({
    type: actionTypes.SOCIAL_AUTH_SUCCESS,
    payload,
  });

export const socialAuth = (payload) =>
  ({
    type: actionTypes.SOCIAL_AUTH,
    payload,
  });

export const setAuthUser = (payload) =>
  ({
    type: actionTypes.SET_AUTH_USER,
    payload,
  });

export const signOut = () =>
  ({
    type: actionTypes.SIGN_OUT,
  });

