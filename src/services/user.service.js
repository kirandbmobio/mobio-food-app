import api from "../utils/axios";

export const profileData = async () => {
  try {
    return await api.get("/user/profile");
  } catch (err) {
    return err;
  }
};
