import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "./types";
import Session from "../utils/session";

import AuthService from "../services/auth.service";

export const register = (user) => {
  return AuthService.register(user).then((data) => {
    if (data.newUser) {
      return { type: REGISTER_SUCCESS, payload: { user: data } };
    } else {
      return { type: REGISTER_FAIL, payload: { user: data } };
    }
  });
};

export const login = (user) => {
  return AuthService.login(user)
    .then((data) => {
      if (data.tokenData) {
        Session.setToken(data.tokenData);
        return { type: LOGIN_SUCCESS, payload: { user: data } };
      } else {
        return { type: LOGIN_FAIL, payload: { user: data } };
      }
    })
    .catch((err) => {
      return { type: LOGIN_FAIL, payload: err };
    });
};

export const forgotPassword = (user) => {
  return AuthService.forgotPassword(user)
    .then((data) => {
      return { type: FORGOT_PASSWORD_SUCCESS, payload: { data } };
    })
    .catch((err) => {
      return { type: FORGOT_PASSWORD_FAIL, payload: err };
    });
};

export const resetPassword = (payload) => {
  return AuthService.resetPassword(payload)
    .then((data) => {
      return { type: RESET_PASSWORD_SUCCESS, payload: { data } };
    })
    .catch((err) => {
      return { type: RESET_PASSWORD_FAIL, payload: err };
    });
};

export const logout = () => (dispatch) => {
  AuthService.logout();
};
