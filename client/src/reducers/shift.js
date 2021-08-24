import {
  GET_SHIFTS,
  UPDATE_SHIFT,
  ADD_SHIFT,
  DELETE_SHIFT,
  SHIFT_ERROR,
  CLEAR_SHIFT,
  GET_SHIFT,
} from "../actions/types";

const initialState = {
  shifts: [],
  shift: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SHIFTS:
      return {
        ...state,
        shifts: payload,
        loading: false,
      };
    case SHIFT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        branch: null,
      };
    case CLEAR_SHIFT:
      return {
        ...state,
        shift: null,
        loading: false,
      };
    case DELETE_SHIFT:
      return {
        ...state,
        shifts: state.shifts.filter((shift) => shift._id !== payload),
        loading: false,
      };
    case GET_SHIFT:
      return {
        ...state,
        shift: payload,
        loading: false,
      };
    case ADD_SHIFT:
      return {
        ...state,
        shifts: [...state.shifts, payload],
        loading: false,
      };
    case UPDATE_SHIFT:
      return {
        ...state,
        shifts: [
          ...state.shifts.filter((shift) => shift._id !== payload._id),
          { ...payload, status: 0 },
        ],
      };
    default:
      return state;
  }
}
