import axios from 'axios';
import { GET_USER, CREATE_USER } from '../constants/actionTypes';

export const createUser = user => (
  dispatch => axios.post('/users/create-user', user)
    .then((res) => {
      dispatch({ type: CREATE_USER, payload: res.data });
      return { status: res.status, user: res.data };
    }).catch(() => ({ status: 500 }))
);

export const getUser = (username, password) => (
  dispatch => axios.post('/users/get-user', { username, password })
    .then((res) => {
      dispatch({ type: GET_USER, payload: res.data });
      return { status: res.status };
    }).catch(() => ({ status: 500 }))
);
