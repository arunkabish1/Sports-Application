import {
    FETCH_SPORTS_REQUEST,
    FETCH_SPORTS_SUCCESS,
    FETCH_SPORTS_FAILURE,
  } from './action';
  
  const initialState = {
    sports: [],
    loading: false,
    error: null,
  };
  
  const reducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_SPORTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_SPORTS_SUCCESS:
        return {
          ...state,
          sports: action.payload,
          loading: false,
        };
      case FETCH_SPORTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  