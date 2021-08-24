import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_TYPEUSERS,
  UPDATE_TYPEUSER,
  ADD_TYPEUSER,
  DELETE_TYPEUSER,
  TYPEUSER_ERROR,
  CLEAR_TYPEUSER,
  GET_TYPEUSER,
} from "./types";

// Create or update typeUser
export const addTypeUser =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/typeUsers", formData, config);

      if (edit) {
        dispatch({
          type: UPDATE_TYPEUSER,
          payload: res.data,
        });
      } else {
        dispatch({
          type: ADD_TYPEUSER,
          payload: res.data,
        });
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: TYPEUSER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Get all Type User
export const getAllTypeUsers = () => async (dispatch) => {
  dispatch({ type: GET_TYPEUSER });
  try {
    const res = await axios.get("/api/typeUsers");

    dispatch({
      type: GET_TYPEUSERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TYPEUSER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get type user by id
export const getTypeUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/typeUsers/${id}`);
    dispatch({
      type: GET_TYPEUSER,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: TYPEUSER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete type user
export const deleteTypeUser = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/typeUsers/${id}`);
    dispatch({
      type: DELETE_TYPEUSER,
      payload: id,
    });
    // dispatch(setAlert("Branch Removed", "success"));
  } catch (err) {
    dispatch({
      type: TYPEUSER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
