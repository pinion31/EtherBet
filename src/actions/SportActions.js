/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GET_SPORTS } from '../constants/actionTypes';
import { API_URL } from '../constants/api_url';

export const getSports = () => (dispatch) => {
  axios
    .get(`${API_URL}/events/get-sports`)
    .then(response => dispatch({ type: GET_SPORTS, payload: response.data }))
    .catch((err) => {
      throw err;
    });
};
