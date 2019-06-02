import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { eventsReducer } from './eventsReducer';
import { sportsReducer } from './sportsReducer';

export default combineReducers({bets: userReducer, events: eventsReducer, sports:sportsReducer });