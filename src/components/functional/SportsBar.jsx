import React from 'React';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import SportsListing from './SportsListing.jsx';

// import 'moment/locale/it';

const SportsBar = ({
  tabIndex, handleChange, sportsList, sportsEvents, onChangeDate, selectedDate,
}) => (
   <div>
    <AppBar position="static">
      {/* <TextField
        id="date"
        type="date"
        defaultValue={"2019-05-09"}
        onChange={onChangeDate}
        InputLabelProps={{
          shrink: true,
        }}
      /> */}
      <DayPickerInput
        style={{ color: 'black' }}
        formatDate={formatDate}
        onDayChange={onChangeDate}
        parseDate={parseDate}
        placeholder={`${formatDate(new Date())}`}
      />
      <Tabs value={tabIndex} onChange={handleChange}>
        {
          sportsList.map(({ sport_id: sportId, sport_name: sportName }) => (
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
