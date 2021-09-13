import {
  GET_PERMIT_REGISTS,
  UPDATE_PERMIT_REGIST,
  ADD_PERMIT_REGIST,
  DELETE_PERMIT_REGIST,
  PERMIT_REGIST_ERROR,
  CLEAR_PERMIT_REGIST,
  GET_PERMIT_REGIST,
} from "../actions/types";

const initialState = {
  permitShiftRegists: [],
  permitShiftRegist: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PERMIT_REGISTS:
      return {
        ...state,
        permitShiftRegists: payload,
        loading: false,
      };
    case PERMIT_REGIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        permitShiftRegist: null,
      };
    case CLEAR_PERMIT_REGIST:
      return {
        ...state,
        permitShiftRegist: null,
        loading: false,
      };
    case DELETE_PERMIT_REGIST:
      return {
        ...state,
        permitShiftRegists: state.permitShiftRegists.filter((per) => per._id !== payload),
        loading: false,
      };
    case GET_PERMIT_REGIST:
      return {
        ...state,
        permitShiftRegist: payload,
        loading: false,
      };
    case ADD_PERMIT_REGIST:
      return {
        ...state,
        permitShiftRegists: [...state.permitShiftRegists, payload],
        loading: false,
      };
    case UPDATE_PERMIT_REGIST:
      return {
        ...state,
        permitShiftRegists: [
          ...state.permitShiftRegists.filter((per) => per._id !== payload._id),
          { ...payload, status: 0 },
        ],
      };
    default:
      return state;
  }
}
