import { SET_ALERT_SHIFTREGISTER, REMOVE_ALERT_SHIFTREGISTER  } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT_SHIFTREGISTER:
      return [...state, payload];
    case REMOVE_ALERT_SHIFTREGISTER:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
