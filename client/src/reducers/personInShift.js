import {
  GET_PERSONINSHIFT,
  GET_PERSONINSHIFTS,
  GET_PERSONINSHIFTS_PREVWEEK,
  UPDATE_PERSONINSHIFT,
  ADD_PERSONINSHIFT,
  PERSONINSHIFT_ERROR,
  CLEAR_PERSONINSHIFT,
} from "../actions/types";

const initialState = {
  personInShifts: [],
  personInShift: [],
  personInShiftsPrevWeek: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PERSONINSHIFTS:
      return {
        ...state,
        personInShifts: payload,
        loading: false,
      };
    case GET_PERSONINSHIFTS_PREVWEEK:
      return {
        ...state,
        personInShiftsPrevWeek: payload,
        loading: false,
      };
    case GET_PERSONINSHIFT:
      return {
        ...state,
        personInShift: payload,
        loading: false,
      };
    case PERSONINSHIFT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_PERSONINSHIFT:
      return {
        ...state,
        personInShifts: [...state.personInShifts, payload],
        loading: false,
      };
    case UPDATE_PERSONINSHIFT:
      return {
        ...state,
        personInShifts: [
          ...state.personInShifts.filter((shift) => shift._id !== payload._id),
          { ...payload, status: 0 },
        ],
      };
    case CLEAR_PERSONINSHIFT:
      return {
        ...state,
        personInShift: [],
        loading: false,
      };
    default:
      return state;
  }
}
