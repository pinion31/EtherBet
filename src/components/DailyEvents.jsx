import React from 'react';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import { formatEvents, extractFormattedDate, compileEvents } from '../helpers/helpers';
import { Provider } from './ContextStore.js';
import { proposeBet } from '../actions/betActions';
import { getEvents } from '../actions/EventActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sports } from '../../__tests__/responses/sports'; // temporary; replace with API call
import SportsListing from './functional/SportsListing.jsx';
import CreateBetModal  from './functional/CreateBetModal.jsx';

class DailyEvents extends React.Component {
  state = {
    modalOpen: false,
    date: new Date('May 12, 2019 00:00:00').toString(),
    receiverLogin: '',
    selectedEventKey: '',
  };

  componentDidMount = () => {
    this.props.getEvents();
  };

  selectEventToBet = (key) => {
    this.setState({})

  };
  toggleBetModal = (key) => {
    const { modalOpen, receiverLogin } = this.state;
    console.log('key', key);
    /*if (modalOpen) {
      this.props.proposeBet(this.props.user.id || 'chris', receiverLogin);
        .then((res) => {
          console.log('bet complete');
        });
  };*/
    this.setState({
      modalOpen : !modalOpen,
      selectedEventKey: !modalOpen ? key : -1,
    });
  };

  handleChange = (event) => {
    this.setState({ receiverLogin: event.target.value });
  };

  render() {
    const { date, modalOpen, selectedEventKey } = this.state;
    const { events } = this.props;
    console.log('events', events);
    const formattedEvents = formatEvents(events, extractFormattedDate);
    const compiledEvents =
      formattedEvents ? compileEvents(formattedEvents[extractFormattedDate(date)]) : [];
    return (
      <div>
        <Provider value={{handleToggleModal: this.toggleBetModal}}>
          <h3>Today's Events</h3>
          {<SportsListing events={compiledEvents ? compiledEvents : [] } />}
          <CreateBetModal
            modalOpen={modalOpen}
            toggleBetModal={this.toggleBetModal}
            handleChange={this.handleChange}
            selectedEvent={selectedEventKey}
            events={compiledEvents}
          /> 
        </Provider>
      </div>
    );
  }
}

function mapStateToProps({bets, events, user}) {
  return {
    user,
    bets,
    events,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    proposeBet,
    getEvents,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (menuWrapper(DailyEvents));