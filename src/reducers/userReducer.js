import { PROPOSE_BET } from '../constants/actionTypes';

export const userReducer = (state = {bet: []}, {type, payload}) => {
  switch (type) {
    case PROPOSE_BET:
      return {bet: [...state.bets, ...payload]};
    default:
      return state;
  }
};