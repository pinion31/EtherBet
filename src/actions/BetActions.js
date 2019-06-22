import axios from 'axios';
import { GET_BETS, PROPOSE_BET } from '../constants/actionTypes';

export const proposeBet = (bet, cb) => (
  (dispatch) => {
    axios.post('/bets/propose-bet', bet)
      .then(res => {
        if (res.data.error) {
          return cb({error: res.data.error});
        }
        cb({status: 200});
        return dispatch({type: PROPOSE_BET, payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const getBets = (userId, cb) => (
  (dispatch) => {
    axios.post('/bets/get-bets', { userId })
      .then((res) => {
        console.log('bets rez', res)
        cb(res.data);
        dispatch({type: GET_BETS, payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);
