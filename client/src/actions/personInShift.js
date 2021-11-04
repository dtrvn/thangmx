import axios from "axios";
import { setAlert } from "./alert";
import moment from "moment";

import {
  GET_PERSONINSHIFT,
  GET_PERSONINSHIFTS,
  GET_PERSONINSHIFTS_PREVWEEK,
  ADD_PERSONINSHIFT,
  UPDATE_PERSONINSHIFT,
  PERSONINSHIFT_ERROR,
  CLEAR_PERSONINSHIFT,
  DELETE_PERSONINSHIFT,
  SETLOADING_PERSONINSHIFT,
} from "./types";

// Create or update shift khi điều chỉnh đối với ca của từng thứ ngày
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
        let addShift3 = null;
        let addShift4 = null;
        let addShift5 = null;
        let addShift6 = null;
        let addShift7 = null;
        let addShift8 = null;
        let addShift9 = null;
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
          if (formData.oldData[i] === formData.shiftId3 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo3) {
            addShift3 = "1";
          }
          if (formData.oldData[i] === formData.shiftId4 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo4) {
            addShift4 = "1";
          }
          if (formData.oldData[i] === formData.shiftId5 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo5) {
            addShift5 = "1";
          }
          if (formData.oldData[i] === formData.shiftId6 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo6) {
            addShift6 = "1";
          }
          if (formData.oldData[i] === formData.shiftId7 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo7) {
            addShift7 = "1";
          }
          if (formData.oldData[i] === formData.shiftId8 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo8) {
            addShift8 = "1";
          }
          if (formData.oldData[i] === formData.shiftId9 && i % 2 === 0 && formData.oldData[i + 1] === formData.personNo9) {
            addShift9 = "1";
          }
        }

        dataAdd.shiftId0 = "0";
        dataAdd.shiftId1 = "0";
        dataAdd.shiftId2 = "0";
        dataAdd.shiftId3 = "0";
        dataAdd.shiftId4 = "0";
        dataAdd.shiftId5 = "0";
        dataAdd.shiftId6 = "0";
        dataAdd.shiftId7 = "0";
        dataAdd.shiftId8 = "0";
        dataAdd.shiftId9 = "0";
        dataAdd.personNo0 = "0";
        dataAdd.personNo1 = "0";
        dataAdd.personNo2 = "0";
        dataAdd.personNo3 = "0";
        dataAdd.personNo4 = "0";
        dataAdd.personNo5 = "0";
        dataAdd.personNo6 = "0";
        dataAdd.personNo7 = "0";
        dataAdd.personNo8 = "0";
        dataAdd.personNo9 = "0";

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
        if (addShift3 !== "1") {
          dataAdd.shiftId3 = formData.shiftId3;
          dataAdd.personNo3 = formData.personNo3;
        }
        if (addShift4 !== "1") {
          dataAdd.shiftId4 = formData.shiftId4;
          dataAdd.personNo4 = formData.personNo4;
        }
        if (addShift5 !== "1") {
          dataAdd.shiftId5 = formData.shiftId5;
          dataAdd.personNo5 = formData.personNo5;
        }
        if (addShift6 !== "1") {
          dataAdd.shiftId6 = formData.shiftId6;
          dataAdd.personNo6 = formData.personNo6;
        }
        if (addShift7 !== "1") {
          dataAdd.shiftId7 = formData.shiftId7;
          dataAdd.personNo7 = formData.personNo7;
        }
        if (addShift8 !== "1") {
          dataAdd.shiftId8 = formData.shiftId8;
          dataAdd.personNo8 = formData.personNo8;
        }
        if (addShift9 !== "1") {
          dataAdd.shiftId9 = formData.shiftId9;
          dataAdd.personNo9 = formData.personNo9;
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

// // Copy person in shifts
// export const copyPersonInShifts = (branchId, dateFrom, dateTo, shifts) => async (dispatch) => {
//   try {

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const dateFromPrev = moment(dateFrom).subtract(7, "days").format('MM-DD-YYYY');
//     const dateToPrev = moment(dateTo).subtract(7, "days").format('MM-DD-YYYY');

//     const res = await axios.get(`/api/personInShifts/weeks/${branchId}/${dateFromPrev}/${dateToPrev}`);

//     const dataAdd = {};

//     dataAdd.id = "";
//     dataAdd.branchId = branchId;
//     dataAdd.dateFrom = dateFrom;
//     dataAdd.dateTo = dateTo;
//     dataAdd.shiftId = "";
//     dataAdd.personNumber = 0;

//     // // Insert thứ 2
//     // dataAdd.date = moment(dateFrom).format('MM-DD-YYYY');
//     // const response = await axios.post("/api/personInShifts", dataAdd, config);
//     // dataAdd.id = response.data._id;

//     // // Insert thứ 3
//     // dataAdd.date = moment(dateFrom).add(1, "days").format('MM-DD-YYYY');
//     // response = await axios.post("/api/personInShifts", dataAdd, config);
//     // dataAdd.id = response.data._id;

//     const getShiftId0 = "";
//     const getShiftId1 = "";
//     const getShiftId2 = "";
//     const getPersonNumber0 = 0;
//     const getPersonNumber1 = 0;
//     const getPersonNumber2 = 0;

//     const getIndex = null;

//     getIndex = res.data.findIndex(ele => moment(dateFrom).subtract(7, "days").format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY'));
//     console.log("index "+getIndex);

//     // res.data.map((ele) => {
//     //   if (moment(dateFrom).subtract(7, "days").format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
//     //     ele.personShift((reg) => {
//     //       getIndex = shifts.findIndex(x => x._id === reg._id);
//     //       if (getIndex === 0) {
//     //         getShiftId0 = reg.shiftId;
//     //         getPersonNumber0 = reg.personNumber;
//     //       }
//     //       if (getIndex === 1) {
//     //         getShiftId1 = reg.shiftId;
//     //         getPersonNumber1 = reg.personNumber;
//     //       }
//     //       if (getIndex === 2) {
//     //         getShiftId2 = reg.shiftId;
//     //         getPersonNumber2 = reg.personNumber;
//     //       }

//     //     })
//     //   }

//     // })

//     console.log("Res " + res.data);


//     dispatch(setAlert("Cập nhật thành công", "success"));

//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//     }

//     dispatch({
//       type: PERSONINSHIFT_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// Create or update shift khi copy số người trong ca của tuần trước
export const copyPersonInShifts =
  (formData) =>
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

        dataAdd.branchId = formData.branchId;
        dataAdd.dateFrom = formData.startDate;
        dataAdd.dateTo = formData.endDate;
        dataAdd.date = formData.currentDate;

        const res1 = await axios.post("/api/personInShifts", dataAdd, config);
        dataAdd.id = res1.data._id;


        dataAdd.shiftId0 = formData.shiftId0;
        dataAdd.personNo0 = formData.personNo0;

        dataAdd.shiftId1 = formData.shiftId1;
        dataAdd.personNo1 = formData.personNo1;

        dataAdd.shiftId2 = formData.shiftId2;
        dataAdd.personNo2 = formData.personNo2;

        dataAdd.shiftId3 = formData.shiftId3;
        dataAdd.personNo3 = formData.personNo3;

        dataAdd.shiftId4 = formData.shiftId4;
        dataAdd.personNo4 = formData.personNo4;

        dataAdd.shiftId5 = formData.shiftId5;
        dataAdd.personNo5 = formData.personNo5;

        dataAdd.shiftId6 = formData.shiftId6;
        dataAdd.personNo6 = formData.personNo6;

        dataAdd.shiftId7 = formData.shiftId7;
        dataAdd.personNo7 = formData.personNo7;

        dataAdd.shiftId8 = formData.shiftId8;
        dataAdd.personNo8 = formData.personNo8;

        dataAdd.shiftId9 = formData.shiftId9;
        dataAdd.personNo9 = formData.personNo9;

        await axios.put("/api/personInShifts/personShift", dataAdd, config);

        if (formData.flagCheckLastRecord !== "") {
          dispatch(getPersonInShift(formData.branchId, formData.startDate, formData.endDate));
          dispatch(setAlert("Cập nhật thành công", "success"));
        }

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
export const getPreWeekPersonInShift = (branchId, dateFrom, dateTo) => async (dispatch) => {
  try {
    if (branchId) {
      const res = await axios.get(`/api/personInShifts/weeks/${branchId}/${dateFrom}/${dateTo}`);
      dispatch({
        type: GET_PERSONINSHIFTS_PREVWEEK,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    }

  } catch (err) {
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
    if (branchId) {
      const res = await axios.get(`/api/personInShifts/weeks/${branchId}/${dateFrom}/${dateTo}`);
      // console.log("in ra 2 "+JSON.stringify(res.data));

      dispatch({
        type: GET_PERSONINSHIFTS,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    }

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
    dispatch({
      type: SETLOADING_PERSONINSHIFT,
      payload: true,
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

// Clear Person In Shift
export const clearPersonInShift = () => async (dispatch) => {
  dispatch({ type: CLEAR_PERSONINSHIFT });
  dispatch({
    type: SETLOADING_PERSONINSHIFT,
    payload: true,
  });
};

// Set value for Loading Spinner
export const setValueLoader = (data) => async (dispatch) => {
  dispatch({
    type: SETLOADING_PERSONINSHIFT,
    payload: data,
  });
};

// No exist data person in shift of prev week
export const viewPersonInShiftArlet = () => async (dispatch) => {
  dispatch(setAlert("Không tồn tại dữ liệu số người trong ca của tuần trước", "warning"));
};

// Delete Person In Shift
export const deletePersonInShift = (branchId, dateFrom, dateTo) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/personInShifts/${branchId}/${dateFrom}/${dateTo}`);
    dispatch({
      type: DELETE_PERSONINSHIFT,
    });
  } catch (err) {
    dispatch({
      type: PERSONINSHIFT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};