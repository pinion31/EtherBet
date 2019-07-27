import { GET_EVENTS } from '../constants/actionTypes';

export const eventsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_EVENTS:
      return [...payload];
    default:
      return state;
  }
};
