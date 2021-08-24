import axios from "axios";
import { setAlert } from "./alert";

import {
  ADD_USER,
  UPDATE_USER,
  USER_ERROR,
  CLEAR_USER,
  USER_LOADED,
  GET_USER,
  DELETE_USER,
  GET_USERS,
  CHANGE_PASSWORD_FAIL,
} from "./types";

// Get current user
// export const getCurrentUser = () => async (dispatch) => {
//   try {
//     const res = await axios.get("/api/users");

//     dispatch({
//       type: GET_USER,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: USER_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// Get getCurrentUser by id
export const getCurrentUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update user
export const createUser =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/updateUser", formData, config);

      dispatch({
        type: GET_USER,
        payload: res.data,
      });

      dispatch(setAlert(edit ? "User Updated" : "User Created", "success"));

      history.push("/users");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Get all Users
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: CLEAR_USER });
  try {
    const res = await axios.get("/api/users");

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get user by id
export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/users/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
    // dispatch(setAlert("Branch Removed", "success"));
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update password for users by Admin
export const updatePassword =
  ({ id, password }, history) =>
  async (dispatch) => {
    const body = JSON.stringify({ id, password });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/adminChangePass", body, config);

      if (res.data === id) {
        dispatch(setAlert("Cập nhật mật khẩu thành công", "success"));
      }

      history.push("/users");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Change password by Users
export const changePassword =
  ({ id, oldPass, newPass }, history) =>
  async (dispatch) => {
    const body = JSON.stringify({ id, oldPass, newPass });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/userChangePass", body, config);

      if (res.data === id) {
        dispatch(setAlert("Cập nhật mật khẩu thành công", "success"));
      }

      history.push("/users");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
