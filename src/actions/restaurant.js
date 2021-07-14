import {
  ADD_RESTAURANT_FAIL,
  ADD_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAIL,
  DELETE_RESTAURANT_SUCCESS,
  EDIT_RESTAURANT_SUCCESS,
  EDIT_RESTAURANT_FAIL,
  LIST_RESTAURANT,
} from "./types";

import {
  getAllRestaurant,
  addNewRestaurant,
  updatedRestaurant,
  deletedRestaurant,
} from "../services/restaurant.service";

export const receivedRestaurants = (json) => ({
  type: LIST_RESTAURANT,
  payload: json,
});

export const addRestaurantS = (json) => ({
  type: ADD_RESTAURANT_SUCCESS,
  payload: json,
});
export const addRestaurantF = (err) => ({
  type: ADD_RESTAURANT_FAIL,
  payload: err,
});
export const updateRestaurantS = (json) => ({
  type: EDIT_RESTAURANT_SUCCESS,
  payload: json,
});
export const updateRestaurantF = (err) => ({
  type: EDIT_RESTAURANT_FAIL,
  payload: err,
});
export const deleteRestaurantS = (json) => ({
  type: DELETE_RESTAURANT_SUCCESS,
  payload: json,
});
export const deleteRestaurantF = (err) => ({
  type: DELETE_RESTAURANT_FAIL,
  payload: err,
});

export function restaurantList() {
  return async function (dispatch) {
    let data = await getAllRestaurant();
    dispatch(receivedRestaurants(data));
    return data;
  };
}

export function addRestaurant(restaurant, resolve) {
  return async function (dispatch) {
    let data = await addNewRestaurant(restaurant);
    if (data.response) {
      dispatch(addRestaurantF({ errorMessage: data.response.data.message }));
      resolve(data);
      return;
    }
    dispatch(addRestaurantS(data));
    resolve(data);
  };
}

export function updateRestaurant(newData, oldData, resolve) {
  return async function (dispatch) {
    let data = await updatedRestaurant(newData);
    if (data.response) {
      dispatch(updateRestaurantF({ errorMessage: data.response.data.message }));
      resolve(data);
      return;
    }
    dispatch(updateRestaurantS({ newData, oldData }));
    resolve(data);
  };
}

export function deleteRestaurant(oldData, resolve) {
  return async function (dispatch) {
    try {
      let data = await deletedRestaurant(oldData);
      dispatch(deleteRestaurantS({ oldData }));
      resolve(data);
    } catch (err) {
      dispatch(deleteRestaurantF(err));
      resolve(err);
    }
  };
}
