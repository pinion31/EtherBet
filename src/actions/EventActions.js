import axios from 'axios';
import { GET_EVENTS } from '../constants/actionTypes';
import { events } from '../../__tests__/responses/NBA_events_2019_05_12_Scheduled'; //temp

export const getEvents = () => (
  (dispatch) => {
    dispatch({type: GET_EVENTS, payload: events});
    //cb();
    /*axios.post('/user/proposeBet', address)
      .then((res) => {
        dispatch({type: 'PROPOSE_BET', payload: res.data});
      }).catch((err) => {
        throw err;
      });*/
  }
);
