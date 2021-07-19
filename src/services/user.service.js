import api from "../utils/axios";

export const profileData = async () => {
  try {
    return await api.get("/user/profile");
  } catch (err) {
    return err;
  }
};

export const userUpdate = async (user) => {
  try {
    return await api.put("/user/update/" + user._id, user);
  } catch (err) {
    return err;
  }
};
