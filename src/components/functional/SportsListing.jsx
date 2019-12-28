import React from 'react';
import SportsEvent from './SportsEvent.jsx';
import { noEvents } from '../css/SportsListing.css';

const NoEvents = () => (
  <div className={noEvents}>
    <h1>No Events Scheduled For Today</h1>
  </div>
);

const SportsListing = ({ events, handleBet }) => (
  <div>
    {
      events
        ? events.map((event, index) => <SportsEvent event={event} key={event.id} handleBet={handleBet} index={index} />) : <NoEvents />
    }
  </div>
);

export default SportsListing;
