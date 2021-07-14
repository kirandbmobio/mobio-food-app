import { PROFILE_SUCCESS } from "./types";

import { profileData } from "../services/user.service";

export const profileSuccess = (data) => ({
  type: PROFILE_SUCCESS,
  payload: data,
});

export function getProfileData() {
  return async function (dispatch) {
    let data = await profileData();
    console.log("data", data);
    dispatch(profileSuccess(data));
    return data;
  };
}
