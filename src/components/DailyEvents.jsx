import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import {
  formatEvents, extractFormattedDate, compileEvents, filterEventsNotToday,
} from '../helpers/helpers';
import { Provider } from './ContextStore.js';
import { proposeBet, getBets } from '../actions/BetActions';
import { getEvents } from '../actions/EventActions';
import SportsListing from './functional/SportsListing.jsx';
import CreateBetModal from './functional/CreateBetModal.jsx';
import {
  smButton, lgButton,
} from './css/baseStyles.js';

const styles = {
  loginParent: {
    marginTop: '20%',
    alignSelf: 'center',
    color: 'white',
  },
  lgButton,
  smButton,
};
class DailyEvents extends React.Component {
  state = {
    modalOpen: false,
    date: new Date(Date.now()).toString(),
    selectedEventKey: '',
  };

  componentDidMount = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getEvents();
    this.props.getBets(this.props.user.id);
  };

  toggleBetModal = (key) => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
      selectedEventKey: !modalOpen ? key : -1,
    });
  };

  render() {
    const { date, modalOpen, selectedEventKey } = this.state;
    const { events } = this.props;
    const filteredEvents = filterEventsNotToday(events);
    const formattedEvents = formatEvents(filteredEvents, extractFormattedDate);
    const compiledEvents = Object.keys(formattedEvents).length ? compileEvents(formattedEvents[extractFormattedDate(date)]) : [];

    return (
      <div>
        <Provider value={{ handleToggleModal: this.toggleBetModal }}>
          <h3>{'Today\'s Events'}</h3>
          {<SportsListing events={compiledEvents} />}
          <CreateBetModal
            modalOpen={modalOpen}
            toggleBetModal={this.toggleBetModal}
            selectedEvent={selectedEventKey}
            events={compiledEvents}
          />
        </Provider>
      </div>
    );
  }
}

function mapStateToProps({ bets, events, user }) {
  return {
    user,
    bets,
    events,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    proposeBet,
    getBets,
    getEvents,
  }, dispatch);
}

export default injectSheet(styles)(connect(mapStateToProps, mapDispatchToProps)(menuWrapper(DailyEvents)));
