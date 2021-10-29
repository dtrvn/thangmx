import {
  GET_SHIFT_REGISTER_MANAGERS,
  UPDATE_SHIFT_REGISTER_MANAGERS,
  ADD_SHIFT_REGISTER_MANAGERS,
  DELETE_SHIFT_REGISTER_MANAGERS,
  SHIFT_REGISTER_MANAGERS_ERROR,
  CLEAR_SHIFT_REGISTER_MANAGERS,
  GET_SHIFT_REGISTER_MANAGER,
  SHOW_SHIFTREGISTERS_MANAGER_MODAL,
} from "../actions/types";

const initialState = {
  shiftRegisterManagers: [],
  shiftRegisterManager: [],
  showAddManagerModal: false,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SHIFT_REGISTER_MANAGERS:
      return {
        ...state,
        shiftRegisterManagers: payload,
        loading: false,
      };
    case SHIFT_REGISTER_MANAGERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_SHIFT_REGISTER_MANAGERS:
      return {
        ...state,
        shiftRegisterManagers: state.shiftRegisterManagers.filter((ele) => ele._id !== payload),
        loading: false,
      };
    case ADD_SHIFT_REGISTER_MANAGERS:
      return {
        ...state,
        shiftRegisterManagers: [...state.shiftRegisterManagers, payload],
        loading: false,
      };
    case UPDATE_SHIFT_REGISTER_MANAGERS:
      return {
        ...state,
        shiftRegisterManagers: [
          ...state.shiftRegisterManagers.filter((shiftRegist) => shiftRegist._id !== payload._id),
          { ...payload, status: 0 },
        ],
      };
    case GET_SHIFT_REGISTER_MANAGER:
      return {
        ...state,
        shiftRegisterManager: payload,
        loading: false,
      };
    case CLEAR_SHIFT_REGISTER_MANAGERS:
      return {
        ...state,
        shiftRegisterManagers: [],
        shiftRegisterManager: [],
        currentDay: null,
        loading: false,
      };
    case SHOW_SHIFTREGISTERS_MANAGER_MODAL:
      return {
        ...state,
        showAddManagerModal: payload,
      };
    default:
      return state;
  }
}
