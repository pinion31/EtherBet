import React, { Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import {
  formatEvents, extractFormattedDate, compileEvents, filterEventsNotToday,
} from '../helpers/helpers';
import { Provider } from './ContextStore.js';
import { proposeBet, getBets } from '../actions/BetActions';
import { getEvents } from '../actions/EventActions';
import {
  dailyEvents,
} from './css/DailyEvents.css';
import CreateBetModal from './functional/CreateBetModal.jsx';

const SportsListing = React.lazy(() => import('./functional/SportsListing.jsx'));

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
      <div className={dailyEvents}>
        <Provider value={{ handleToggleModal: this.toggleBetModal }}>
          <h3 style={{ marginLeft: 20, fontSize: '2em', marginBottom: 0 }}>{'Today\'s Events'}</h3>
          <Suspense fallback={<CircularProgress />}>
            <SportsListing events={compiledEvents} />
          </Suspense>
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

export default connect(mapStateToProps, mapDispatchToProps)(menuWrapper(DailyEvents));
