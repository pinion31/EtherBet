import React from 'React';
import SportsBar from './functional/SportsBar.jsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Provider } from './ContextStore.js';
import { sports } from '../../__tests__/responses/sports'; // temporary; replace with API call
import { events } from '../../__tests__/responses/NBA_events_2019_05_12_Scheduled';

class Home extends React.Component {
  state = {
    value:0,
    sportsList: [],
    sportsEvents: {},
    modalOpen: false,
    selectedDate: '',
  };

  componentDidMount = () => {
    const allEvents = {};
    events.forEach(event => {
      const {event_date: eventDate, sport_id: sportId } = event;
      const formattedDate =  this.extractFormattedDate(eventDate);
      if (!allEvents[formattedDate]) allEvents[formattedDate] = {};
      allEvents[formattedDate] [sportId] ?
        allEvents[formattedDate] [sportId].push(event) :
        allEvents[formattedDate] [sportId] = [event];
    });

    console.log('events', allEvents);
    console.log('events 4', allEvents['2019-05-12'][4]);

    this.setState({sportsList: sports, sportsEvents: allEvents });
  };

  toggleBetModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen : !modalOpen });

  };

  extractFormattedDate = (date) => {
    const newDate = new Date(date);
    const dayOfMonth = (newDate.getDate()).toString().length == 1 ? `0${newDate.getDate()}`: newDate.getDate();
    const month = (newDate.getMonth() + 1).toString().length == 1 ? `0${newDate.getMonth() + 1}`: newDate.getMonth() + 1;
    console.log('newDate.getMonth() + 1', newDate.getMonth() + 1);
    console.log('month', month);
    return `${newDate.getFullYear()}-${month}-${dayOfMonth}`;
  };

  handleChange = (event,value) => {
    this.setState({value});
  };

  handleChangeDate = (date, value) => {
    this.setState({selectedDate: this.extractFormattedDate(date)})
  };

  render() {
    const { value, sportsList, sportsEvents, modalOpen, selectedDate } = this.state;
    return (
      <div style={{backgroundColor: 'red'}}>
        <Provider value={{handleToggleModal: this.toggleBetModal}}>
          <SportsBar
            data-testid="sports-bar"
            tabIndex={value}
            sportsList={sportsList}
            handleChange={this.handleChange}
            selectedDate={selectedDate}
            sportsEvents={sportsEvents}
            onChangeDate={this.handleChangeDate}
           />
           <Dialog
            open={modalOpen}
            onClose={this.toggleBetModal}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Invite A Friend To Bet</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter Address of Friend
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Address"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleBetModal} color="primary">
                Cancel
              </Button>
              <Button onClick={this.toggleBetModal} color="primary">
                Propose Bet
              </Button>
            </DialogActions>
          </Dialog>
        </Provider>
      </div>
    );
}
}

export default Home;