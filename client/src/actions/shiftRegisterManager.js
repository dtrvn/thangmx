import axios from "axios";
import { setAlert } from "./alert";
import { setAlertShiftRegister } from "./alertShiftRegister";
import moment from "moment";

import {
  GET_SHIFT_REGISTER_MANAGERS,
  UPDATE_SHIFT_REGISTER_MANAGERS,
  ADD_SHIFT_REGISTER_MANAGERS,
  DELETE_SHIFT_REGISTER_MANAGERS,
  SHIFT_REGISTER_MANAGERS_ERROR,
  CLEAR_SHIFT_REGISTER_MANAGERS,
  GET_SHIFT_REGISTER_MANAGER,
  SHOW_SHIFTREGISTERS_MANAGER_MODAL,
} from "./types";

// Create or Update Shift Register Manager
export const addUpdateDeleteUserManager =
  (formData, edit = false) =>
    async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        // console.log("shift action "+ formData.userId + " - " + formData.userIdOld+ " - " + formData.branchId + " - " + formData.dateFrom + " - " + formData.dateTo + " - " + formData.date);
        // console.log("userFlag " + formData.userFlag);
        if (formData.userFlag === "0") {
          dispatch(setAlert("Chưa có thay đổi", "warning"));
        } else {
          if (formData.userFlag === "1") {
            dispatch({
              type: SHOW_SHIFTREGISTERS_MANAGER_MODAL,
              payload: false,
            });
            // Delete
            const res = await axios.delete(`/api/shiftRegisterManagers/${formData.userIdOld}/${formData.branchId}/${formData.date}`);
            dispatch({
              type: DELETE_SHIFT_REGISTER_MANAGERS,
              payload: res.data,
            });
            dispatch(setAlert("Xoá quản lý thành công", "success"));
          }
          if (formData.userFlag === "2") {
            dispatch({
              type: SHOW_SHIFTREGISTERS_MANAGER_MODAL,
              payload: false,
            });
            // Update
            const res1 = await axios.post("/api/shiftRegisterManagers", formData, config);
            dispatch({
              type: UPDATE_SHIFT_REGISTER_MANAGERS,
              payload: res1.data,
            });
            dispatch(setAlert("Cập nhật quản lý thành công", "success"));
          }
          if (formData.userFlag === "3") {
            dispatch({
              type: SHOW_SHIFTREGISTERS_MANAGER_MODAL,
              payload: false,
            });
            // Add
            const res2 = await axios.post("/api/shiftRegisterManagers", formData, config);
            dispatch({
              type: ADD_SHIFT_REGISTER_MANAGERS,
              payload: res2.data,
            });
            dispatch(setAlert("Thêm mới quản lý thành công", "success"));
          }
        }


        // if (formData.userId !== null) {
        //   const res = await axios.post("/api/shiftRegisterManagers", formData, config);

        //   if (edit) {
        //     dispatch({
        //       type: UPDATE_SHIFT_REGISTER_MANAGERS,
        //       payload: res.data,
        //     });
        //   } else {
        //     dispatch({
        //       type: ADD_SHIFT_REGISTER_MANAGERS,
        //       payload: res.data,
        //     });
        //   }
        // } else {
        //   dispatch(setAlert("Chưa chọn người quản lý", "danger"));
        // }

      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
          type: SHIFT_REGISTER_MANAGERS_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
    };

// Delete Shift Register
// export const deleteUserShiftRegisterManager = (shiftId) => async (dispatch) => {
//   try {
//     // console.log("nhan id "+shiftId);
//     const res = await axios.delete(`/api/shiftRegisters2/${shiftId}`);
//     dispatch({
//       type: DELETE_SHIFT_REGISTER,
//       payload: shiftId,
//     });
//   } catch (err) {
//     dispatch({
//       type: SHIFT_REGISTER_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// Update or Delete User of Shift Register
// export const updateOrDeleteUser =
//   (formData) =>
//     async (dispatch) => {
//       try {
//         const config = {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         };

//         if (formData.userFlag === "0") {
//           dispatch(setAlertShiftRegister("Chưa có thay đổi", "warning"));
//         } else {
//           // console.log("action in ra " + formData.id + " - " + formData.userId + " - " + formData.userFlag);
//           if (formData.userFlag === "1") {
//             // Delete
//             const res = await axios.delete(`/api/shiftRegisters2/${formData.id}`);
//             dispatch({
//               type: DELETE_SHIFT_REGISTER,
//               payload: formData.id,
//             });
//             dispatch(setAlertShiftRegister("Xoá nhân viên thành công", "success"));
//           }
//           if (formData.userFlag === "2") {
//             // Update
//             const res = await axios.post("/api/shiftRegisters2/updateUser", formData, config);
//             dispatch({
//               type: UPDATE_SHIFT_REGISTERS,
//               payload: res.data,
//             });
//             dispatch(setAlertShiftRegister("Cập nhật nhân viên thành công", "success"));
//           }
//         }

//       } catch (err) {
//         const errors = err.response.data.errors;
//         if (errors) {
//           errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//         }
//         dispatch({
//           type: SHIFT_REGISTER_ERROR,
//           payload: { msg: err.response.statusText, status: err.response.status },
//         });
//       }
//     };


// Get shift Register Managers by branchId, dateFrom, dateTo
export const getShiftRegisterManagers = (branchId, dateFrom, dateTo) => async (dispatch) => {
  dispatch({ type: CLEAR_SHIFT_REGISTER_MANAGERS });
  try {
    if (branchId) {
      // console.log("action in ra " + branchId + " - " + dateFrom + " - " + dateTo);
      const res = await axios.get(`/api/shiftRegisterManagers/${branchId}/${dateFrom}/${dateTo}`);
      dispatch({
        type: GET_SHIFT_REGISTER_MANAGERS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    }

  } catch (err) {
    dispatch({
      type: SHIFT_REGISTER_MANAGERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Show Shift Register Manager Modal
export const setShowAddManagerModal = (data) => async (dispatch) => {
  dispatch({
    type: SHOW_SHIFTREGISTERS_MANAGER_MODAL,
    payload: data,
  });
};
