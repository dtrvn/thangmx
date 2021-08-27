import { v4 as uuid } from "uuid";
import { SET_ALERT_SHIFTREGISTER, REMOVE_ALERT_SHIFTREGISTER } from "./types";

export const setAlertShiftRegister = (msg, alertType, timeout = 1000) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT_SHIFTREGISTER,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT_SHIFTREGISTER, payload: id }), timeout);
};
