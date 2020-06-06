import axios from 'axios';
import { GET_BETS, PROPOSE_BET, SET_STATUS } from '../constants/actionTypes';
import { API_URL } from '../constants/api_url';

export const proposeBet = (bet, cb) => (dispatch) => {
  axios
    .post(`${API_URL}/bets/propose-bet`, bet)
    .then((res) => {
      if (res.data.error) {
        return cb({ error: res.data.error });
      }
      cb({ status: 200 });
      return dispatch({ type: PROPOSE_BET, payload: res.data });
    })
    .catch((err) => {
      throw err;
    });
};

export const getBets = userId => (dispatch) => {
  axios
    .post(`${API_URL}/bets/get-bets`, { userId })
    .then((res) => {
      dispatch({ type: GET_BETS, payload: res.data });
    })
    .catch((err) => {
      throw err;
    });
};

export const setBetStatus = (newStatus, betId, cb) => (dispatch) => {
  axios
    .post(`${API_URL}/bets/set-bet-status`, { newStatus, betId })
    .then((res) => {
      cb(res.data);
      dispatch({ type: SET_STATUS, payload: res.data });
    })
    .catch((err) => {
      throw err;
    });
};
