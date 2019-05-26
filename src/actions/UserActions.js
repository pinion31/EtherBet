import axios from 'axios';

export const proposeBet = address => (
  (dispatch) => {
    console.log('test');
    /*axios.post('/user/proposeBet', address)
      .then((res) => {
        dispatch({type: 'PROPOSE_BET', payload: res.data});
      }).catch((err) => {
        throw err;
      });*/
  }
);
