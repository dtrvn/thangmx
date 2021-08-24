import {
  GET_JOBS,
  DELETE_JOB,
  CLEAR_JOB,
  JOB_ERROR,
  GET_JOB,
  UPDATE_JOB,
  ADD_JOB,
} from "../actions/types";

const initialState = {
  jobs: [],
  job: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false,
      };
    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        job: null,
      };
    case CLEAR_JOB:
      return {
        ...state,
        job: null,
        loading: false,
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== payload),
        loading: false,
      };
    case GET_JOB:
      return {
        ...state,
        job: payload,
        loading: false,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, payload],
        loading: false,
      };
    case UPDATE_JOB:
      return {
        ...state,
        jobs: [
          ...state.jobs.filter((job) => job._id !== payload._id),
          { ...payload, status: 0 },
        ],
      };
    default:
      return state;
  }
}
