import { PROPOSE_BET, GET_BETS } from '../constants/actionTypes';

export const betReducer = (state = {bet: []}, {type, payload}) => {
  switch (type) {
    case PROPOSE_BET:
      return {bet: [...state.bets, ...payload]};
    case GET_BETS:
      return {bet: [...payload]};
    default:
      return state;
  }
};