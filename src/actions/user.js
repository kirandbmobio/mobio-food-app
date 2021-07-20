import {
  PROFILE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
  PASSWORD_CHANGE_SUCCESS,
} from "./types";

import {
  profileData,
  userUpdate,
  passwordChange,
} from "../services/user.service";

export const profileSuccess = (data) => ({
  type: PROFILE_SUCCESS,
  payload: data,
});

export const updatedUserS = (data) => ({
  type: USER_UPDATE_SUCCESS,
  payload: data,
});
export const updatedUserF = (message) => ({
  type: USER_UPDATE_FAIL,
  payload: message,
});

/* password change failed */
export const passwordChangeF = (message) => ({
  type: PASSWORD_CHANGE_FAIL,
  payload: message,
});
/* password change success */
export const passwordChangeS = (data) => ({
  type: PASSWORD_CHANGE_SUCCESS,
  payload: data,
});

export function getProfileData() {
  return async function (dispatch) {
    let data = await profileData();
    dispatch(profileSuccess(data));
    return data;
  };
}

export function updateUser(user) {
  return async function (dispatch) {
    let data = await userUpdate(user);
    data.user = user;
    if (data.response) {
      dispatch(updatedUserF({ errorMessage: data.response.data.message }));
    } else {
      dispatch(updatedUserS(data));
    }
    return data;
  };
}

export function changePassword(user) {
  return async function (dispatch) {
    let data = await passwordChange(user);
    // if (data.response) {
    //   dispatch(passwordChangeF({ errorMessage: data.response.data.message }));
    // } else {
    //   dispatch(passwordChangeS(data));
    // }
    return data;
  };
}
