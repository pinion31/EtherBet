import axios from 'axios';
import { GET_USER, CREATE_USER } from '../constants/actionTypes';

export const createUser = user => (
  (dispatch) => {
    return axios.post('/users/create-user', user)
      .then((res) => {
        dispatch({type: CREATE_USER, payload: res.data});
        return {status: 200, user: res.data};
      }).catch((err) => {
        return {status: 500};
      });
  }
);

export const getUser = (username, password) => (
  (dispatch) => {
    console.log('test');
    //dispatch({type: GET_USER, payload: {user:'chris'}});
    return axios.post('/users/get-user', {username, password})
      .then((res) => {
        console.log('res', res);
        dispatch({type: GET_USER, payload: res.data});
        return {status: 200};
      }).catch((err) => {
        return {status: 500};
      });
  }
);
