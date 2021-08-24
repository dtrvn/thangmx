import {
  GET_TYPEUSERS,
  UPDATE_TYPEUSER,
  ADD_TYPEUSER,
  DELETE_TYPEUSER,
  TYPEUSER_ERROR,
  CLEAR_TYPEUSER,
  GET_TYPEUSER,
} from "../actions/types";

const initialState = {
  typeUsers: [],
  typeUser: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TYPEUSERS:
      return {
        ...state,
        typeUsers: payload,
        loading: false,
      };
    case TYPEUSER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        branch: null,
      };
    case CLEAR_TYPEUSER:
      return {
        ...state,
        typeUser: null,
        loading: false,
      };
    case DELETE_TYPEUSER:
      return {
        ...state,
        typeUsers: state.typeUsers.filter(
          (typeUser) => typeUser._id !== payload
        ),
        loading: false,
      };
    case GET_TYPEUSER:
      return {
        ...state,
        typeUser: payload,
        loading: false,
      };
    case ADD_TYPEUSER:
      return {
        ...state,
        typeUsers: [...state.typeUsers, payload],
        loading: false,
      };
    case UPDATE_TYPEUSER:
      return {
        ...state,
        typeUsers: [
          ...state.typeUsers.filter((typeUser) => typeUser._id !== payload._id),
          { ...payload, status: 0 },
        ],
      };
    default:
      return state;
  }
}
