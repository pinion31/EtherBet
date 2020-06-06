import axios from 'axios';
import { GET_USER, CREATE_USER, LOGOUT_USER } from '../constants/actionTypes';
import { API_URL } from '../constants/api_url';

export const createUser = user => dispatch => axios
  .post(`${API_URL}/users/create-user`, user)
  .then((res) => {
    dispatch({ type: CREATE_USER, payload: res.data });
    return { status: res.status, user: res.data };
  })
  .catch(() => ({ status: 500 }));

export const getUser = (username, password) => dispatch => axios
  .post(`${API_URL}/users/get-user`, { username, password })
  .then((res) => {
    dispatch({ type: GET_USER, payload: res.data });
    if (res.status == 200) {
      return { status: res.status, error: res.data.error };
    }
  })
  .catch(() => ({ status: 500, error: 'Error logging in user.' }));

export const logoutUser = id => dispatch => axios
  .post(`${API_URL}/users/logout`, { id })
  .then((res) => {
    dispatch({ type: LOGOUT_USER, payload: {} });
    if (res.status == 200) {
      return { status: res.status, error: res.data.error };
    }
  })
  .catch(() => ({ status: 500, error: 'Error logging out user.' }));
