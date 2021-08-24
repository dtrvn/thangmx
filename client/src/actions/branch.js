import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_BRANCHS,
  UPDATE_BRANCH,
  ADD_BRANCH,
  DELETE_BRANCH,
  BRANCH_ERROR,
  CLEAR_BRANCH,
  GET_BRANCH,
} from "./types";

// Create or update branch
export const addBranch =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/branchs", formData, config);

      if (edit) {
        dispatch({
          type: UPDATE_BRANCH,
          payload: res.data,
        });
      } else {
        dispatch({
          type: ADD_BRANCH,
          payload: res.data,
        });
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: BRANCH_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Get all Branchs
export const getAllBranchs = () => async (dispatch) => {
  dispatch({ type: CLEAR_BRANCH });
  try {
    const res = await axios.get("/api/branchs");

    dispatch({
      type: GET_BRANCHS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BRANCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get branch by id
export const getBranch = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/branchs/${id}`);
    dispatch({
      type: GET_BRANCH,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: BRANCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete branch
export const deleteBranch = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/branchs/${id}`);
    dispatch({
      type: DELETE_BRANCH,
      payload: id,
    });
    // dispatch(setAlert("Branch Removed", "success"));
  } catch (err) {
    dispatch({
      type: BRANCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
