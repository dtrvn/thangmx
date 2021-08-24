import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_SHIFTS,
  UPDATE_SHIFT,
  ADD_SHIFT,
  DELETE_SHIFT,
  SHIFT_ERROR,
  CLEAR_SHIFT,
  GET_SHIFT,
} from "./types";

// Create or update shift
export const addShift =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/shifts", formData, config);

      if (edit) {
        dispatch({
          type: UPDATE_SHIFT,
          payload: res.data,
        });
      } else {
        dispatch({
          type: ADD_SHIFT,
          payload: res.data,
        });
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: SHIFT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Get all Shifts
export const getAllShifts = () => async (dispatch) => {
  dispatch({ type: CLEAR_SHIFT });
  try {
    const res = await axios.get("/api/shifts");

    dispatch({
      type: GET_SHIFTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SHIFT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get shift by id
export const getShift = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/shifts/${id}`);
    dispatch({
      type: GET_SHIFT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: SHIFT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete shift
export const deleteShift = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/shifts/${id}`);
    dispatch({
      type: DELETE_SHIFT,
      payload: id,
    });
    // dispatch(setAlert("Branch Removed", "success"));
  } catch (err) {
    dispatch({
      type: SHIFT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
