/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GET_SPORTS } from '../constants/actionTypes';

export const getSports = () => (
  (dispatch) => {
    axios.get('/events/get-sports')
      .then(response => dispatch({ type: GET_SPORTS, payload: response.data }))
      .catch((err) => {
        throw err;
      });
  }
);
