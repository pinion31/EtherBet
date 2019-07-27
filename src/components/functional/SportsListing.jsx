import React from 'React';
import SportsEvent from './SportsEvent.jsx';

const SportsListing = ({ events, handleBet }) => {
  console.log('todays events', events);
  return (
    <div>
      {
      events
        ? events.map((event, index) => <SportsEvent event={event} key={index} handleBet={handleBet} index={index} />) : 'No Events Scheduled For Today'
    }
    </div>

  );
};

export default SportsListing;
