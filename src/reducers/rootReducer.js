import { combineReducers } from 'redux';
import { betReducer } from './betReducer';
import { eventsReducer } from './eventsReducer';
import { sportsReducer } from './sportsReducer';
import { userReducer } from './userReducer';

export default combineReducers({
  user: userReducer, bets: betReducer, events: eventsReducer, sports: sportsReducer,
});
