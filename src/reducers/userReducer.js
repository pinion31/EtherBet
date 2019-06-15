import { GET_USER, CREATE_USER } from '../constants/actionTypes';

export const userReducer = (state = {user: {}}, {type, payload}) => {
  switch (type) {
    case GET_USER:
    case CREATE_USER:
      return {...payload};
    default:
      return state;
  }
};