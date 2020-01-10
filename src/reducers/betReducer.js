/* eslint-disable import/prefer-default-export */
import { PROPOSE_BET, GET_BETS, LOGOUT_USER } from '../constants/actionTypes';

export const betReducer = (state = [], { type, payload }) => {
  switch (type) {
    case PROPOSE_BET:
      return [...state, payload];
    case LOGOUT_USER:
      return [];
    case GET_BETS:
      return [...payload];
    default:
      return state;
  }
};
