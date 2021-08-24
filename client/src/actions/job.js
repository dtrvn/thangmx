import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_JOBS,
  UPDATE_JOB,
  ADD_JOB,
  DELETE_JOB,
  JOB_ERROR,
  CLEAR_JOB,
  GET_JOB,
} from "./types";

// Create or update job
export const addJob =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/jobs", formData, config);

      console.log("in ra " + edit);
      if (edit) {
        dispatch({
          type: UPDATE_JOB,
          payload: res.data,
        });
      } else {
        dispatch({
          type: ADD_JOB,
          payload: res.data,
        });
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: JOB_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Get all jobs
export const getAllJobs = () => async (dispatch) => {
  dispatch({ type: CLEAR_JOB });
  try {
    const res = await axios.get("/api/jobs");

    dispatch({
      type: GET_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get job by id
export const getJob = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/jobs/${id}`);
    dispatch({
      type: GET_JOB,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete job
export const deleteJob = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/jobs/${id}`);
    dispatch({
      type: DELETE_JOB,
      payload: id,
    });
    // dispatch(setAlert("Job Removed", "success"));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
