import { GET_EVENTS } from '../constants/actionTypes';

export const eventsReducer = (state = {events: []}, {type, payload}) => {
  switch (type) {
    case GET_EVENTS:
      return {events: [...payload]};
    default:
      return state;
  }
};