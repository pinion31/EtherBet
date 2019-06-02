import { GET_SPORTS } from '../constants/actionTypes';

export const sportsReducer = (state = {sports: []}, {type, payload}) => {
  switch (type) {
    case GET_SPORTS:
      return {sports: [...payload]};
    default:
      return state;
  }
};