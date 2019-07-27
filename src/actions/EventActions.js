import axios from 'axios';
import { GET_EVENTS } from '../constants/actionTypes';

export const getEvents = () => (
  (dispatch) => {
    axios.get('/events/events-for-today')
      .then(res => dispatch({ type: GET_EVENTS, payload: res.data }))
      .catch((err) => {
        throw err;
      });
  }
);
