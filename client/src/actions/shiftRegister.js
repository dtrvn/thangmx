import axios from "axios";
import { setAlert } from "./alert";
import { setAlertShiftRegister } from "./alertShiftRegister";

import {
  GET_SHIFT_REGISTERS,
  UPDATE_SHIFT_REGISTERS,
  ADD_SHIFT_REGISTER,
  DELETE_SHIFT_REGISTER,
  SHIFT_REGISTER_ERROR,
  CLEAR_SHIFT_REGISTER,
  GET_SHIFT_REGISTER,
} from "./types";

// Create or update profile
// export const createProfile =
//   (formData, history, edit = false) =>
//   async (dispatch) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const res = await axios.post("/api/shiftRegister2", formData, config);

//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data,
//       });

//       dispatch(
//         setAlert(edit ? "Profile Updated" : "Profile Created", "success")
//       );

//       if (!edit) {
//         history.push("/dashboard");
//       }
//     } catch (err) {
//       const errors = err.response.data.errors;

//       if (errors) {
//         errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//       }

//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   };

// Create Shift Register
export const addUserShiftRegister =
  (formData) =>
    async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        // console.log("shift action" + formData.userId + " - " + formData.branchId + " - " + formData.dateFrom + " - " + formData.dateTo);
        const res = await axios.post("/api/shiftRegisters2", formData, config);

        dispatch({
          type: ADD_SHIFT_REGISTER,
          payload: res.data,
        });

      } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
          type: SHIFT_REGISTER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
    };

// Delete Shift Register
export const deleteUserShiftRegister = (shiftId) => async (dispatch) => {
  try {
    // console.log("nhan id "+shiftId);
    const res = await axios.delete(`/api/shiftRegisters2/${shiftId}`);
    dispatch({
      type: DELETE_SHIFT_REGISTER,
      payload: shiftId,
    });
  } catch (err) {
    dispatch({
      type: SHIFT_REGISTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Get shift Registers by branchId, dateFrom, dateTo
export const getShiftRegisters = (branchId, dateFrom, dateTo) => async (dispatch) => {
  try {
    if (branchId) {
      // console.log("action in ra " + branchId + " - " + dateFrom + " - " + dateTo);
      const res = await axios.get(`/api/shiftRegisters2/${branchId}/${dateFrom}/${dateTo}`);
      dispatch({
        type: GET_SHIFT_REGISTERS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    }

  } catch (err) {
    dispatch({
      type: SHIFT_REGISTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Shift Register
export const updateShiftRegister =
  (formData) =>
    async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        // console.log("registerId "+formData.registerId0+" - "+formData.registerId1+" - "+formData.registerId2);
        // console.log("branchId "+formData.branchId+" - "+formData.dateFrom+" - "+formData.dateTo);
        // console.log("shift action" + formData.id + " - " + formData.shiftId0 + " - " + formData.shiftId1 + " - " + formData.shiftId2);
        // console.log("job list " + formData.jobId0 + " - " + formData.jobId1 + " - " + formData.jobId2 + " - " + formData.date);
        // console.log("cost list " + formData.cost0 + " - " + formData.cost1 + " - " + formData.cost2);
        // console.log("check mode " + formData.shiftFlag0 + " - " + formData.shiftFlag1 + " - " + formData.shiftFlag2);

        await axios.put("/api/shiftRegisters2/register", formData, config);
        const res = await axios.get(`/api/shiftRegisters2/${formData.branchId}/${formData.dateFrom}/${formData.dateTo}`);
        dispatch({
          type: GET_SHIFT_REGISTERS,
          payload: res.data,
        });
        dispatch(setAlertShiftRegister("Cập nhật ca thành công", "success"));


      } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
          type: SHIFT_REGISTER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
    };
