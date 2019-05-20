import React from 'React';
import SportsEvent from './SportsEvent.jsx';

const SportsListing = ({events, handleBet}) => {
  return (
  <div>
    {
      events ?
      events.map((event, index) => {
        return <SportsEvent event={event} key={index} handleBet={handleBet} />
      }) : "No Events Scheduled For Today"
    }
  </div>

)};

export default SportsListing;