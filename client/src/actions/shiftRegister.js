import axios from "axios";
import { setAlert } from "./alert";
import { setAlertShiftRegister } from "./alertShiftRegister";
import moment from "moment";

import {
  GET_SHIFT_REGISTERS,
  UPDATE_SHIFT_REGISTERS,
  ADD_SHIFT_REGISTER,
  DELETE_SHIFT_REGISTER,
  SHIFT_REGISTER_ERROR,
  CLEAR_SHIFT_REGISTER,
  CLEAR_SHIFT_REGISTER_VIEW_SALARY,
  GET_SHIFT_REGISTER,
  SET_CURRENT_DAY,
  SHOW_SHIFTREGISTERS_MODAL,
  SHOW_SHIFTREGISTERS_USER_MODAL,
  SETLOADING_SHIFTREGISTER,
} from "./types";
// import { PromiseProvider } from "mongoose";
// import { count } from "../../../models/ShiftRegister2";

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
        if (formData.userId !== null) {
          const res = await axios.post("/api/shiftRegisters2", formData, config);

          dispatch({
            type: ADD_SHIFT_REGISTER,
            payload: res.data,
          });
          dispatch(setAlert("Đã thêm nhân viên", "success"));
        } else {
          dispatch(setAlert("Chưa chọn nhân viên", "error"));
        }


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

// Delete Shift Register khi xoá tạo tuần mới
export const deleteShiftRegisterNextWeek = (branchId, dateFrom, dateTo) => async (dispatch) => {
  try {
    // console.log("nhan id "+shiftId);
    const res = await axios.delete(`/api/shiftRegisters2/allUser/${branchId}/${dateFrom}/${dateTo}`);
    // dispatch({
    //   type: DELETE_SHIFT_REGISTER,
    // });
  } catch (err) {
    dispatch({
      type: SHIFT_REGISTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update or Delete User of Shift Register
export const updateOrDeleteUser =
  (formData) =>
    async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        if (formData.userFlag === "0") {
          // dispatch(setAlertShiftRegister("Chưa có thay đổi", "warning"));
          dispatch(setAlert("Chưa có thay đổi", "warning"));
        } else {
          // console.log("action in ra " + formData.id + " - " + formData.userId + " - " + formData.userFlag);
          if (formData.userFlag === "1") {
            // Delete
            const res = await axios.delete(`/api/shiftRegisters2/${formData.id}`);
            dispatch({
              type: DELETE_SHIFT_REGISTER,
              payload: formData.id,
            });
            // dispatch(setAlertShiftRegister("Xoá nhân viên thành công", "success"));
            dispatch({
              type: SHOW_SHIFTREGISTERS_USER_MODAL,
              payload: false,
            });
            dispatch(setAlert("Xoá nhân viên thành công", "success"));
          }
          if (formData.userFlag === "2") {
            // Update
            const res = await axios.post("/api/shiftRegisters2/updateUser", formData, config);
            dispatch({
              type: UPDATE_SHIFT_REGISTERS,
              payload: res.data,
            });
            dispatch({
              type: SHOW_SHIFTREGISTERS_USER_MODAL,
              payload: false,
            });
            // dispatch(setAlertShiftRegister("Cập nhật nhân viên thành công", "success"));
            dispatch(setAlert("Cập nhật nhân viên thành công", "success"));
          }
        }

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


// Get shift Registers by branchId, dateFrom, dateTo
export const getShiftRegisters = (branchId, dateFrom, dateTo) => async (dispatch) => {
  dispatch({ type: CLEAR_SHIFT_REGISTER });
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

// Get shift Registers by userId, dateFrom, dateTo
export const getShiftRegisterViewSalary = (userId, dateFrom, dateTo, currentDay) => async (dispatch) => {

  dispatch({ type: CLEAR_SHIFT_REGISTER_VIEW_SALARY });
  try {
    if (userId) {
      // console.log("action in ra " + userId + " - " + dateFrom + " - " + dateTo);

      dispatch({
        type: SET_CURRENT_DAY,
        payload: currentDay,
      });
      const res = await axios.get(`/api/shiftRegisters2/salaryPersonal/${userId}/${dateFrom}/${dateTo}`);
      dispatch({
        type: GET_SHIFT_REGISTER,
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

// Get shift Registers by branchId, dateFrom, dateTo
export const getShiftRegistersForMonth = (dateFrom, dateTo) => async (dispatch) => {
  dispatch({ type: CLEAR_SHIFT_REGISTER });
  try {
    // console.log("action in ra " + branchId + " - " + dateFrom + " - " + dateTo);
    // Truyền vào branchId nhưng không sử dụng
    const branchId = 0;
    const res = await axios.get(`/api/shiftRegisters2/salary/${branchId}/${dateFrom}/${dateTo}`);
    dispatch({
      type: GET_SHIFT_REGISTERS,
      payload: res.data,
    });
    dispatch({
      type: SETLOADING_SHIFTREGISTER,
      payload: false,
    });
    return Promise.resolve(res.data);

  } catch (err) {
    dispatch({
      type: SHIFT_REGISTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Show Shift Register Modal
export const setShowShiftRegistersModal = (data) => async (dispatch) => {
  dispatch({
    type: SHOW_SHIFTREGISTERS_MODAL,
    payload: data,
  });
};

// Show Shift Register User Modal
export const setShowShiftRegistersUserModal = (data) => async (dispatch) => {
  dispatch({
    type: SHOW_SHIFTREGISTERS_USER_MODAL,
    payload: data,
  });
};

// Set Loading Shift Register
export const setShiftRegisterLoader = (data) => async (dispatch) => {
  dispatch({
    type: SETLOADING_SHIFTREGISTER,
    payload: data,
  });
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

        // console.log("shifts " + JSON.stringify(formData.listShifts));

        // Check có thay đổi đăng kí ca hay không
        let flagCheckUpdate = "";
        if (formData.shiftFlag0 !== "0") {
          flagCheckUpdate = "1";
        }
        if (formData.shiftFlag1 !== "0") {
          flagCheckUpdate = "1";
        }
        if (formData.shiftFlag2 !== "0") {
          flagCheckUpdate = "1";
        }
        if (flagCheckUpdate === "") {
          // dispatch(setAlertShiftRegister("Chưa có thay đổi", "warning"));
          dispatch(setAlert("Chưa có thay đổi", "warning"));
        } else {
          // Check ca đăng kí có vượt qua số ca được phép đăng kí của từng nhân viên hay không
          if (formData.permitShiftRegistFlag === false) {
            // dispatch(setAlertShiftRegister("Vượt quá số ca quy định", "danger"));
            dispatch(setAlert("Vượt quá số ca quy định", "error"));
          } else {
            // Check ca đăng kí có vượt quá số ca quy định theo ca của 1 ngày hay không
            let getIndex = null;
            let countShift0 = 0;
            let countShift1 = 0;
            let countShift2 = 0;

            const res1 = await axios.get(`/api/shiftRegisters2/${formData.branchId}/${formData.dateFrom}/${formData.dateTo}`);
            // console.log("res1 " + JSON.stringify(res1.data));
            res1.data.map((ele) => {
              ele.register.map((reg) => {
                if (moment(reg.date).format('MM-DD-YYYY') === formData.date) {
                  // console.log("shiftId "+reg.shiftId);
                  getIndex = formData.listShifts.indexOf(reg.shiftId);

                  if (getIndex === 0) {
                    countShift0 = countShift0 + 1;
                  }
                  if (getIndex === 1) {
                    countShift1 = countShift1 + 1;
                  }
                  if (getIndex === 2) {
                    countShift2 = countShift2 + 1;
                  }
                }
              })
            })

            // if (formData.shiftFlag0 !== "0" && formData.shiftFlag0 !== "3") {
            //   countShift0 = countShift0 + 1;
            // }
            // if (formData.shiftFlag1 !== "0" && formData.shiftFlag1 !== "3") {
            //   countShift1 = countShift1 + 1;
            // }
            // if (formData.shiftFlag2 !== "0" && formData.shiftFlag2 !== "3") {
            //   countShift2 = countShift2 + 1;
            // }

            if (formData.shiftFlag0 === "2") {
              countShift0 = countShift0 + 1;
            }
            if (formData.shiftFlag1 === "2") {
              countShift1 = countShift1 + 1;
            }
            if (formData.shiftFlag2 === "2") {
              countShift2 = countShift2 + 1;
            }

            let flagUpdate = "";
            if (countShift0 > formData.personInShift0) {
              flagUpdate = "1";
              // dispatch(setAlertShiftRegister(`${formData.listShiftsName[0]} đã đủ số lượng đăng kí`, "danger"));
              dispatch(setAlert(`${formData.listShiftsName[0]} đã đủ số lượng đăng kí`, "error"));
            }
            if (countShift1 > formData.personInShift1) {
              flagUpdate = "1";
              // dispatch(setAlertShiftRegister(`${formData.listShiftsName[1]} đã đủ số lượng đăng kí`, "danger"));
              dispatch(setAlert(`${formData.listShiftsName[1]} đã đủ số lượng đăng kí`, "error"));
            }
            if (countShift2 > formData.personInShift2) {
              flagUpdate = "1";
              // dispatch(setAlertShiftRegister(`${formData.listShiftsName[2]} đã đủ số lượng đăng kí`, "danger"));
              dispatch(setAlert(`${formData.listShiftsName[2]} đã đủ số lượng đăng kí`, "error"));
            }

            if (flagUpdate === "") {
              dispatch({
                type: SHOW_SHIFTREGISTERS_MODAL,
                payload: false,
              });
              dispatch({
                type: SETLOADING_SHIFTREGISTER,
                payload: false,
              });
              await axios.put("/api/shiftRegisters2/register", formData, config);
              const res = await axios.get(`/api/shiftRegisters2/${formData.branchId}/${formData.dateFrom}/${formData.dateTo}`);
              dispatch({
                type: GET_SHIFT_REGISTERS,
                payload: res.data,
              });
              // dispatch(setAlertShiftRegister("Cập nhật ca thành công", "success"));
              dispatch(setAlert("Cập nhật ca thành công", "success"));
            }
          }
        }
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
