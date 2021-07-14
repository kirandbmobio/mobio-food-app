import api from "../utils/axios";

export const getAllRestaurant = async () => {
  try {
    return await api.get("/restaurant");
  } catch (err) {
    return err;
  }
};

export const addNewRestaurant = async (newData) => {
  try {
    return await api.post("/restaurant/create", newData);
  } catch (err) {
    return err;
  }
};

export const updatedRestaurant = async (newData) => {
  try {
    return await api.post("/restaurant/update/" + newData._id, newData);
  } catch (err) {
    return err;
  }
};

export const deletedRestaurant = async (oldData) => {
  try {
    return await api.delete("/restaurant/delete/" + oldData._id);
  } catch (err) {
    return err;
  }
};
