import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import { sportTabs, tabHolder, tabContainer, sportsBar } from '../css/SportsBar.css';


import SportsListing from './SportsListing.jsx';

const SportsBar = ({
  tabIndex, handleChange, sportsList, sportsEvents, onChangeDate, selectedDate,
}) => (
  <div>
    <AppBar position="static" className={sportsBar}>
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
      <Tabs className={tabContainer} value={tabIndex} onChange={handleChange} indicatorColor="black">
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

export default SportsBar;
