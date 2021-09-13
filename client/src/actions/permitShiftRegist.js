import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PERMIT_REGISTS,
  UPDATE_PERMIT_REGIST,
  ADD_PERMIT_REGIST,
  DELETE_PERMIT_REGIST,
  PERMIT_REGIST_ERROR,
  CLEAR_PERMIT_REGIST,
  GET_PERMIT_REGIST,
} from "./types";

// Create or update Permit Shift Regist
export const addPermitShiftRegist =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("in ra "+JSON.stringify(formData));
      const res = await axios.post("/api/permissionShiftNumbers", formData, config);

      if (edit) {
        dispatch({
          type: UPDATE_PERMIT_REGIST,
          payload: res.data,
        });
      } else {
        dispatch({
          type: ADD_PERMIT_REGIST,
          payload: res.data,
        });
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PERMIT_REGIST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Get all Permit Shift Regist
export const getAllPermitShifts = () => async (dispatch) => {
  dispatch({ type: CLEAR_PERMIT_REGIST });
  try {
    const res = await axios.get("/api/permissionShiftNumbers");
    // console.log("get ve "+JSON.stringify(res.data));
    dispatch({
      type: GET_PERMIT_REGISTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PERMIT_REGIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Permit Shift Regist by id
export const getPermitShift = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/permissionShiftNumbers/${id}`);
    dispatch({
      type: GET_PERMIT_REGIST,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: PERMIT_REGIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete ermit Shift Regist
export const deletePermitShift = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/permissionShiftNumbers/${id}`);
    dispatch({
      type: DELETE_PERMIT_REGIST,
      payload: id,
    });
    // dispatch(setAlert("Job Removed", "success"));
  } catch (err) {
    dispatch({
      type: PERMIT_REGIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
