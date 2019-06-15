import React from 'React';
import SportsBar from './functional/SportsBar.jsx';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import CreateBetModal  from './functional/CreateBetModal.jsx';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import { proposeBet } from '../actions/BetActions';
import { getSports } from '../actions/SportActions';
import { Provider } from './ContextStore.js';
import { formatEvents, extractFormattedDate } from '../helpers/helpers';

class Home extends React.Component {
  state = {
    value:0,
    modalOpen: false,
    selectedDate: '',
  };

  componentDidMount = () => {
    this.props.getSports();
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
    const { value, modalOpen, selectedDate } = this.state;
    const { events, sports: sportsList } = this.props;

    const sportsEvents = formatEvents(events, extractFormattedDate);
    return (
      <div style={{backgroundColor: 'red'}}>
        <Provider value={{handleToggleModal: this.toggleBetModal}}>
            <SportsBar
              data-testid="sports-bar"
              tabIndex={value}
              sportsList={sportsList.sports || []}
              handleChange={this.handleChange}
              selectedDate={selectedDate}
              sportsEvents={sportsEvents}
              onChangeDate={this.handleChangeDate}
             />
             <CreateBetModal
                modalOpen={modalOpen}
                toggleBetModal={this.toggleBetModal}
                sendBet={() => console.log('bet sent')}
              /> 
             {/*<Dialog
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
             </Dialog>*/}
        </Provider>
      </div>
    );
}
}

function mapStateToProps({bets, events, sports}) {
  return {
    bets,
    events,
    sports,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    proposeBet,
    getSports,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (menuWrapper(Home));
