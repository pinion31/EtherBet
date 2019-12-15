import React from 'React';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import injectSheet from 'react-jss';
import 'react-day-picker/lib/style.css';
import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import { greenSecondary0 } from '../../constants/colors';

import SportsListing from './SportsListing.jsx';

const styles = {
  sportTabs: {
    backgroundColor: `${greenSecondary0} !important`,
    borderTopRightRadius: '10px !important',
    borderTopLeftRadius: '10px !important',
    margin: '.5px !important',
    width: '11%',
  },
  tabHolder: {
    backgroundColor: 'gray',
  },
};

const SportsBar = ({
  tabIndex, handleChange, sportsList, sportsEvents, onChangeDate, selectedDate, classes: { sportTabs, tabHolder },
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
            <Tab className={sportTabs} label={sportName} key={sportId} />
          ))
        }
      </Tabs>
    </AppBar>
    <div className={tabHolder}>
      { tabIndex == 0
        && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][1] : []} /> }
      { tabIndex == 1
        && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][2] : []} /> }
      { tabIndex == 2 && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][3] : []} /> }
      { tabIndex == 3 && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][4] : []} /> }
      { tabIndex == 4 && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][5] : []} /> }
      { tabIndex == 5 && <SportsListing events={sportsEvents[selectedDate] ? sportsEvents[selectedDate][6] : []} /> }
    </div>
  </div>
);

export default injectSheet(styles)(SportsBar);
