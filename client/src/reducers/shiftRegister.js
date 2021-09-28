import {
  GET_SHIFT_REGISTERS,
  UPDATE_SHIFT_REGISTERS,
  ADD_SHIFT_REGISTER,
  DELETE_SHIFT_REGISTER,
  SHIFT_REGISTER_ERROR,
  CLEAR_SHIFT_REGISTER,
  GET_SHIFT_REGISTER,
  CLEAR_SHIFT_REGISTER_VIEW_SALARY,
  SET_CURRENT_DAY,
} from "../actions/types";

const initialState = {
  shiftRegisters: [],
  shiftRegister: [],
  currentDay: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SHIFT_REGISTERS:
      return {
        ...state,
        shiftRegisters: payload,
        loading: false,
      };
    case SHIFT_REGISTER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_SHIFT_REGISTER:
      return {
        ...state,
        shiftRegisters: state.shiftRegisters.filter((ele) => ele._id !== payload),
        loading: false,
      };
    case ADD_SHIFT_REGISTER:
      return {
        ...state,
        shiftRegisters: [...state.shiftRegisters, payload],
        loading: false,
      };
    case UPDATE_SHIFT_REGISTERS:
      return {
        ...state,
        shiftRegisters: [
          ...state.shiftRegisters.filter((shiftRegist) => shiftRegist._id !== payload._id),
          { ...payload, status: 0 },
        ],
      };
    case GET_SHIFT_REGISTER:
      return {
        ...state,
        shiftRegister: payload,
        loading: false,
      };
    case SET_CURRENT_DAY:
      return {
        ...state,
        currentDay: payload,
      };
    case CLEAR_SHIFT_REGISTER:
      return {
        ...state,
        shiftRegisters: [],
        shiftRegister: [],
        currentDay: null,
        loading: false,
      };
    case CLEAR_SHIFT_REGISTER_VIEW_SALARY:
      return {
        ...state,
        shiftRegister: [],
        loading: false,
      };
    default:
      return state;
  }
}
