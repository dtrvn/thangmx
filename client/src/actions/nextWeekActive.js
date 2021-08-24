import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_NEXTWEEKACTIVE,
    ADD_NEXTWEEKACTIVE,
    DELETE_NEXTWEEKACTIVE,
    NEXTWEEKACTIVE_ERROR,
    CLEAR_NEXTWEEKACTIVE,
} from "./types";

// Create next week active
export const addNextWeekActive =
    (formData, history) =>
        async (dispatch) => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const res = await axios.post("/api/nextWeekActive", formData, config);
                console.log("lay data "+JSON.stringify(res.data));
                dispatch({
                    type: ADD_NEXTWEEKACTIVE,
                    payload: res.data,
                });
                
            } catch (err) {
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
                }

                dispatch({
                    type: NEXTWEEKACTIVE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status },
                });
            }
        };

// Get nextweekactive mới nhất
export const getNextWeekActive = () => async (dispatch) => {
    dispatch({ type: CLEAR_NEXTWEEKACTIVE });
    try {
        const res = await axios.get("/api/nextWeekActive");
        // console.log("lay ngay thang "+JSON.stringify(res.data));
        dispatch({
            type: GET_NEXTWEEKACTIVE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: NEXTWEEKACTIVE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Delete nextweekactive
export const deleteNextWeekActive = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/nextWeekActive/${id}`);
        //Get lại ngày mới nhất hiện tại
        const resNew = await axios.get("/api/nextWeekActive");
        // console.log("lay ngay thang "+JSON.stringify(res.data));
        dispatch({
            type: GET_NEXTWEEKACTIVE,
            payload: resNew.data,
        });
        // dispatch({
        //     type: DELETE_NEXTWEEKACTIVE,
        //     payload: id,
        // });
        // dispatch(setAlert("Job Removed", "success"));
    } catch (err) {
        dispatch({
            type: NEXTWEEKACTIVE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};
