import React from 'React';
import SportsBar from './functional/SportsBar.jsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import { proposeBet } from '../actions/UserActions';
import { Provider } from './ContextStore.js';
import { formatEvents, extractFormattedDate } from '../helpers/helpers';
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
    this.setState({
      sportsList: sports,
      sportsEvents: formatEvents(events, extractFormattedDate)
    });
  };

  toggleBetModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen : !modalOpen });
    this.props.proposeBet({});
  };

  handleChange = (event,value) => {
    this.setState({value});
  };

  handleChangeDate = (date, value) => {
    console.log('date1', date);
    this.setState({selectedDate: extractFormattedDate(date)})
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

function mapStateToProps(state) {
  return {
    bets: state.bets,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    proposeBet,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (menuWrapper(Home));
