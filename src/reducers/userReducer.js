/* eslint-disable import/prefer-default-export */
import { GET_USER, CREATE_USER, LOGOUT_USER } from '../constants/actionTypes';

export const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_USER:
    case CREATE_USER:
      return { ...payload };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};
