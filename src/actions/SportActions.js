import axios from 'axios';
import { GET_SPORTS } from '../constants/actionTypes';
import { sports } from '../../__tests__/responses/sports';//temp

export const getSports = () => (
  (dispatch) => {
    dispatch({type: GET_SPORTS, payload: sports});
    //cb();
    /*axios.post('/user/proposeBet', address)
      .then((res) => {
        dispatch({type: 'PROPOSE_BET', payload: res.data});
      }).catch((err) => {
        throw err;
      });*/
  }
);