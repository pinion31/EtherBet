import React from 'React';
import SportsEvent from './SportsEvent.jsx';

const SportsListing = ({ events, handleBet }) => (
  <div>
    {
      events
        ? events.map((event, index) => <SportsEvent event={event} key={index} handleBet={handleBet} index={index} />) : 'No Events Scheduled For Today'
    }
  </div>

);

export default SportsListing;
