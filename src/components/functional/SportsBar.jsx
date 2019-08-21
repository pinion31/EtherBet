import React from 'React';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import SportsListing from './SportsListing.jsx';

const SportsBar = ({
  tabIndex, handleChange, sportsList, sportsEvents, onChangeDate, selectedDate,
}) => (
  <div>
    <AppBar position="static">
      <DayPickerInput
        style={{ color: 'black' }}
        id="date-picker"
        inputProps={{ 'data-testid': 'date-picker' }}
        formatDate={formatDate}
        onDayChange={onChangeDate}
        data-testid="date-picker"
        parseDate={parseDate}
        placeholder={`${formatDate(new Date(Date.now()))}`}
      />
      <Tabs value={tabIndex} onChange={handleChange}>
        {
          sportsList && sportsList.map(({ sportId, sportName }) => (
            <Tab label={sportName} key={sportId} />
          ))
        }
      </Tabs>
    </AppBar>
    { tabIndex == 0
        && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][1] : []} /> }
    { tabIndex == 1
        && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][2] : []} /> }
    { tabIndex == 2 && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][3] : []} /> }
    { tabIndex == 3 && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][4] : []} /> }
    { tabIndex == 4 && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][5] : []} /> }
    { tabIndex == 5 && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][6] : []} /> }
  </div>
);

export default SportsBar;
