import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
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
        console.log("1234", data);
        return { type: LOGIN_FAIL, payload: { user: data } };
      }
    })
    .catch((err) => {
      return { type: LOGIN_FAIL, payload: err };
    });
};

export const logout = () => (dispatch) => {
  AuthService.logout();
};
