import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  PROFILE_SUCCESS,
} from "../../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
initialState.profileUser = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("state", state);
  //   console.log(payload);
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case PROFILE_SUCCESS:
      console.log("payload", payload);
      return {
        ...state,
        profileUser: payload.data,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        profileUser: payload.data.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case USER_UPDATE_FAIL:
      return state;
    default:
      return state;
  }
}
