import {
    GET_NEXTWEEKACTIVE,
    ADD_NEXTWEEKACTIVE,
    DELETE_NEXTWEEKACTIVE,
    NEXTWEEKACTIVE_ERROR,
    CLEAR_NEXTWEEKACTIVE,
  } from "../actions/types";
  
  const initialState = {
    nextWeekDB: [],
    loading: true,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_NEXTWEEKACTIVE:
        return {
          ...state,
          nextWeekDB: payload,
          loading: false,
        };
      case NEXTWEEKACTIVE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case CLEAR_NEXTWEEKACTIVE:
        return {
          ...state,
          nextWeekDB: null,
          loading: false,
        };
      case ADD_NEXTWEEKACTIVE:
        return {
          ...state,
          nextWeekDB: payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  