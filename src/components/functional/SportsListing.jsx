import React from 'React';
import SportsEvent from './SportsEvent.jsx';

const SportsListing = ({events}) => (
  <div>
    {
      events.map(event => {
        console.log('event', event);
        return <SportsEvent event={event} />
      })
    }
  </div>

);

export default SportsListing;