import {
  GET_SHIFT_REGISTERS,
  UPDATE_SHIFT_REGISTERS,
  ADD_SHIFT_REGISTER,
  DELETE_SHIFT_REGISTER,
  SHIFT_REGISTER_ERROR,
  CLEAR_SHIFT_REGISTER,
  GET_SHIFT_REGISTER,
} from "../actions/types";

const initialState = {
  shiftRegisters: [],
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
    default:
      return state;
  }
}
