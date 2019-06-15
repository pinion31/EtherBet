import axios from 'axios';
import { GET_USER, CREATE_USER } from '../constants/actionTypes';

export const createUser = user => (
  (dispatch) => {
    return axios.post('/users/create-user', user)
      .then((res) => {
        dispatch({type: CREATE_USER, payload: res.data});
        return {status: 200, user: res.data};
      }).catch((err) => {
        return {status: 500};
      });
  }
);

export const getUser = address => (
  (dispatch) => {
    console.log('test');
    //dispatch({type: GET_BETS, payload: bets});
    /*axios.post('/user/proposeBet', address)
      .then((res) => {
        dispatch({type: 'PROPOSE_BET', payload: res.data});
      }).catch((err) => {
        throw err;
      });*/
  }
);
