import React from 'React';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SportsListing from './SportsListing.jsx';

const SportsBar = ({tabIndex, handleChange, sportsList, sportsEvents}) => (
  <div>
    <AppBar position="static">
      <Tabs value={tabIndex} onChange={handleChange}>
        {
          sportsList.map(({sport_id: sportId, sport_name: sportName}) => (
            <Tab label={sportName} key={sportId} />
          ))
        }
      </Tabs>
    </AppBar>
    { tabIndex == 0 && <SportsListing events={sportsEvents} /> }
    { tabIndex == 1 && <SportsListing events={sportsEvents} /> }
  </div>
);

export default SportsBar;