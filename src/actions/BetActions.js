import axios from 'axios';
import { GET_BETS } from '../constants/actionTypes';
import { bets } from '../../__tests__/responses/bets'; //temp

export const proposeBet = (bet) => (
  (dispatch) => {
    axios.post('/bets/propose-bet', bet)
      .then((res) => {
        dispatch({type: 'PROPOSE_BET', payload: res.data});
      }).catch((err) => {
        throw err;
      });
  }
);

export const getBets = address => (
  (dispatch) => {
    console.log('test');
    dispatch({type: GET_BETS, payload: bets});
    /*axios.post('/user/proposeBet', address)
      .then((res) => {
        dispatch({type: 'PROPOSE_BET', payload: res.data});
      }).catch((err) => {
        throw err;
      });*/
  }
);
