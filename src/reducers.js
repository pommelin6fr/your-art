import { LOAD_DATA } from './actions';


const initialState = {};

export const dataFatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        data: action.payload
    };
    default:
      return state;
  }
};
