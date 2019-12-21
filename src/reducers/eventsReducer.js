/* eslint-disable import/prefer-default-export */
import { GET_EVENTS, GET_EVENTS_FOR_DAY, GET_EVENTS_FOR_SUBSEQUENT_DAYS } from '../constants/actionTypes';

export const eventsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_EVENTS_FOR_DAY:
    case GET_EVENTS_FOR_SUBSEQUENT_DAYS:
    case GET_EVENTS:
      return [...payload];
    default:
      return state;
  }
};
