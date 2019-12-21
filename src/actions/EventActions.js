import axios from 'axios';
import { GET_EVENTS, GET_EVENTS_FOR_DAY, GET_EVENTS_FOR_SUBSEQUENT_DAYS } from '../constants/actionTypes';

export const getEvents = () => (
  (dispatch) => {
    axios.get('/events/events-for-today')
      .then(res => dispatch({ type: GET_EVENTS, payload: res.data }))
      .catch((err) => {
        throw err;
      });
  }
);

export const getEventsForDay = eventDate => (
  dispatch => axios.post('/events/events-for-day', { eventDate })
    .then((res) => {
      if (res.data) {
        dispatch({ type: GET_EVENTS_FOR_DAY, payload: res.data });
      }
      return { status: 200 };
    })
    .catch((err) => {
      throw err;
    })
);

export const getEventsForUpcomingDays = () => (
  dispatch => axios.get('/events/events-for-subsequent-days')
    .then((res) => {
      if (res.data) {
        dispatch({ type: GET_EVENTS_FOR_SUBSEQUENT_DAYS, payload: res.data });
      }
      return { status: 200 };
    })
    .catch((err) => {
      throw err;
    })
);
