import {
  LIST_RESTAURANT,
  ADD_RESTAURANT_SUCCESS,
  EDIT_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAIL,
  EDIT_RESTAURANT_FAIL,
} from "../../actions/types";

const initialState = {
  restaurants: [],
  errors: [],
  successMessages: [],
};

export default function (state = initialState, action) {
  state.errors = [];
  state.successMessages = [];
  switch (action.type) {
    case LIST_RESTAURANT:
      state = {
        ...state,
        errors: [],
        successMessages: [],
        restaurants: action.payload.data.data,
      };
      return state;

    case ADD_RESTAURANT_SUCCESS:
      /* empty errors and success messages  */
      clearState(state);
      /* assign restaurant to another variable */
      let restaurants = [...state.restaurants];
      let addedRestaurant = action.payload.data.data;
      /* push new restaurant */
      restaurants.push(addedRestaurant);

      setSuccessMessages(
        state,
        `${addedRestaurant.restaurant_name} added successfully!`
      );

      /* set the state */
      state = { ...state, restaurants: [...restaurants] };

      return state;

    case EDIT_RESTAURANT_SUCCESS:
      /* empty errors and success messages  */
      clearState(state);

      let dataUpdate = [...state.restaurants];
      const index = action.payload.oldData.tableData.id;
      dataUpdate[index] = action.payload.newData;
      setSuccessMessages(
        state,
        `${action.payload.newData.restaurant_name} updated successfully!`
      );
      state = { ...state, restaurants: [...dataUpdate] };
      return state;

    case DELETE_RESTAURANT_SUCCESS:
      /* empty errors and success messages  */
      clearState(state);

      const dataDelete = [...state.restaurants];
      const i = action.payload.oldData.tableData.id;
      dataDelete.splice(i, 1);
      setSuccessMessages(
        state,
        `${action.payload.oldData.restaurant_name} deleted successfully!`
      );
      state = { ...state, restaurants: [...dataDelete] };
      return state;

    case ADD_RESTAURANT_FAIL:
      clearState(state);
      return setErrors(state, action);

    case EDIT_RESTAURANT_FAIL:
      clearState(state);
      return setErrors(state, action);

    default:
      return state;
  }
}

function clearState(state) {
  state.errors = [];
  state.successMessages = [];
}

function setErrors(state, action) {
  const errors = [...state.errors];
  errors.push(action.payload.errorMessage);
  state = { ...state, errors: [...errors] };
  return state;
}

function setSuccessMessages(state, message) {
  /* push the successMessage */
  state.successMessages.push(message);
}
