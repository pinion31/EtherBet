import { combineReducers } from 'redux';
import { betReducer } from './betReducer';
import { eventsReducer } from './eventsReducer';
import { sportsReducer } from './sportsReducer';

export default combineReducers({bets: betReducer, events: eventsReducer, sports:sportsReducer });