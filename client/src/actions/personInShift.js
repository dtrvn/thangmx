import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PERSONINSHIFT,
  GET_PERSONINSHIFTS,
  ADD_PERSONINSHIFT,
  UPDATE_PERSONINSHIFT,
  PERSONINSHIFT_ERROR,
  CLEAR_PERSONINSHIFT,
} from "./types";

// Create or update shift
export const addPersonInShift =
  (formData, history) =>
    async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        // console.log("action " + JSON.stringify(formData));
        // const res = await axios.post("/api/personInShifts/add", formData, config);

        const dataAdd = {};

        dataAdd.id = formData.id;
        dataAdd.branchId = formData.branchId;
        dataAdd.dateFrom = formData.startDate;
        dataAdd.dateTo = formData.endDate;
        dataAdd.date = formData.currentDate;

        // const res = [];
        if (!formData.id) {
          const res1 = await axios.post("/api/personInShifts", dataAdd, config);
          dataAdd.id = res1.data._id;
        }

        // Check data không thay đổi
        let addShift0 = null;
        let addShift1 = null;
        let addShift2 = null;
        for (let i = 0; i < formData.oldData.length; i++) {
          if (formData.oldData[i] === formData.shiftId0 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo0) {
            addShift0 = "1";
          }
          if (formData.oldData[i] === formData.shiftId1 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo1) {
            addShift1 = "1";
          }
          if (formData.oldData[i] === formData.shiftId2 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo2) {
            addShift2 = "1";
          }
        }

        dataAdd.shiftId0 = "0";
        dataAdd.shiftId1 = "0";
        dataAdd.shiftId2 = "0";
        dataAdd.personNo0 = "0";
        dataAdd.personNo1 = "0";
        dataAdd.personNo2 = "0";

        if (addShift0 !== "1") {
          dataAdd.shiftId0 = formData.shiftId0;
          dataAdd.personNo0 = formData.personNo0;
        }
        if (addShift1 !== "1") {
          dataAdd.shiftId1 = formData.shiftId1;
          dataAdd.personNo1 = formData.personNo1;
        }
        if (addShift2 !== "1") {
          dataAdd.shiftId2 = formData.shiftId2;
          dataAdd.personNo2 = formData.personNo2;
        }

        // dataAdd.shiftId0 = formData.shiftId0;
        // dataAdd.shiftId1 = formData.shiftId1;
        // dataAdd.shiftId2 = formData.shiftId2;
        // dataAdd.personNo0 = formData.personNo0;
        // dataAdd.personNo1 = formData.personNo1;
        // dataAdd.personNo2 = formData.personNo2;

        await axios.put("/api/personInShifts/personShift", dataAdd, config);

        // dataAdd.shiftId = null;
        // dataAdd.personNumber = null;

        // // Check data không thay đổi
        // let addShift0 = null;
        // let addShift1 = null;
        // let addShift2 = null;
        // for (let i = 0; i < formData.oldData.length; i++) {
        //   if (formData.oldData[i] === formData.shiftId0 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo0) {
        //     addShift0 = "1";
        //   }
        //   if (formData.oldData[i] === formData.shiftId1 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo1) {
        //     addShift1 = "1";
        //   }
        //   if (formData.oldData[i] === formData.shiftId2 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo2) {
        //     addShift2 = "1";
        //   }
        // }

        // // console.log("add shift "+addShift0+" - "+addShift1+" - "+addShift2);
        // // Add Ca 1
        // if (addShift0 !== "1") {
        //   dataAdd.shiftId = formData.shiftId0;
        //   dataAdd.personNumber = formData.personNo0;

        //   await axios.put("/api/personInShifts/personShift", dataAdd, config);
        // }

        // // Add Ca 2
        // if (addShift1 !== "1") {
        //   dataAdd.shiftId = formData.shiftId1;
        //   dataAdd.personNumber = formData.personNo1;
        //   await axios.put("/api/personInShifts/personShift", dataAdd, config);
        // }

        // // Add Ca 3
        // if (addShift2 !== "1") {
        //   dataAdd.shiftId = formData.shiftId2;
        //   dataAdd.personNumber = formData.personNo2;

        //   await axios.put("/api/personInShifts/personShift", dataAdd, config);
        // }

        dispatch(setAlert("Cập nhật thành công", "success"));

      } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
          type: PERSONINSHIFT_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
    };

// Copy person in shifts
export const copyPersonInShifts =
  (formData, history) =>
    async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const dataAdd = {};

        dataAdd.id = formData.id;
        dataAdd.branchId = formData.branchId;
        dataAdd.dateFrom = formData.startDate;
        dataAdd.dateTo = formData.endDate;
        dataAdd.date = formData.currentDate;

        // const res = [];
        if (!formData.id) {
          const res1 = await axios.post("/api/personInShifts", dataAdd, config);
          dataAdd.id = res1.data._id;
        }

        // Check data không thay đổi
        let addShift0 = null;
        let addShift1 = null;
        let addShift2 = null;
        for (let i = 0; i < formData.oldData.length; i++) {
          if (formData.oldData[i] === formData.shiftId0 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo0) {
            addShift0 = "1";
          }
          if (formData.oldData[i] === formData.shiftId1 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo1) {
            addShift1 = "1";
          }
          if (formData.oldData[i] === formData.shiftId2 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo2) {
            addShift2 = "1";
          }
        }

        dataAdd.shiftId0 = "0";
        dataAdd.shiftId1 = "0";
        dataAdd.shiftId2 = "0";
        dataAdd.personNo0 = "0";
        dataAdd.personNo1 = "0";
        dataAdd.personNo2 = "0";

        if (addShift0 !== "1") {
          dataAdd.shiftId0 = formData.shiftId0;
          dataAdd.personNo0 = formData.personNo0;
        }
        if (addShift1 !== "1") {
          dataAdd.shiftId1 = formData.shiftId1;
          dataAdd.personNo1 = formData.personNo1;
        }
        if (addShift2 !== "1") {
          dataAdd.shiftId2 = formData.shiftId2;
          dataAdd.personNo2 = formData.personNo2;
        }

        await axios.put("/api/personInShifts/personShift", dataAdd, config);


        dispatch(setAlert("Cập nhật thành công", "success"));

      } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
          type: PERSONINSHIFT_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status },
        });
      }
    };

// Get person in Shift by dateFrom and dateTo
export const getPersonInShift = (branchId, dateFrom, dateTo) => async (dispatch) => {
  try {
    // console.log("in ra "+branchId+" - "+dateFrom+" - "+dateTo);
    // if (branchId) {
    const res = await axios.get(`/api/personInShifts/weeks/${branchId}/${dateFrom}/${dateTo}`);
    // console.log("in ra 2 "+JSON.stringify(res.data));
    dispatch({
      type: GET_PERSONINSHIFTS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
    // }

  } catch (err) {
    dispatch({
      type: PERSONINSHIFT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get person in Shift by dateFrom and dateTo and date
export const getPersonInShiftDate = (branchId, dateFrom, dateTo, date) => async (dispatch) => {
  dispatch({ type: CLEAR_PERSONINSHIFT });
  try {
    // console.log("in ra action " + branchId + " - " + dateFrom + " - " + dateTo + " - " + date);
    // if (branchId) {
    const res = await axios.get(`/api/personInShifts/${branchId}/${dateFrom}/${dateTo}/${date}`);
    // console.log("in ra 2 " + JSON.stringify(res.data));
    dispatch({
      type: GET_PERSONINSHIFT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
    // }

  } catch (err) {
    dispatch({
      type: PERSONINSHIFT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
