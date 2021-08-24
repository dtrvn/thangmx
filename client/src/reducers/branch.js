import {
  GET_BRANCHS,
  DELETE_BRANCH,
  CLEAR_BRANCH,
  BRANCH_ERROR,
  GET_BRANCH,
  UPDATE_BRANCH,
  ADD_BRANCH,
} from "../actions/types";

const initialState = {
  branchs: [],
  branch: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BRANCHS:
      return {
        ...state,
        branchs: payload,
        loading: false,
      };
    case BRANCH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        branch: null,
      };
    case CLEAR_BRANCH:
      return {
        ...state,
        branch: null,
        loading: false,
      };
    case DELETE_BRANCH:
      return {
        ...state,
        branchs: state.branchs.filter((branch) => branch._id !== payload),
        loading: false,
      };
    case GET_BRANCH:
      return {
        ...state,
        branch: payload,
        loading: false,
      };
    case ADD_BRANCH:
      return {
        ...state,
        branchs: [...state.branchs, payload],
        loading: false,
      };
    case UPDATE_BRANCH:
      return {
        ...state,
        branchs: [
          ...state.branchs.filter((branch) => branch._id !== payload._id),
          { ...payload, status: 0 },
        ],
      };
    default:
      return state;
  }
}
