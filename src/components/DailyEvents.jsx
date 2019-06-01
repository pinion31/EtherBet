import React from 'react';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import { formatEvents, extractFormattedDate, compileEvents } from '../helpers/helpers';
import { Provider } from './ContextStore.js';
import { proposeBet } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sports } from '../../__tests__/responses/sports'; // temporary; replace with API call
import { events } from '../../__tests__/responses/NBA_events_2019_05_12_Scheduled';
import SportsListing from './functional/SportsListing.jsx';

class DailyEvents extends React.Component {
  state = {
    sportsEvents: null,
    modalOpen: false,
    date: new Date('May 12, 2019 00:00:00').toString(),
  };

  componentDidMount = () => {
    console.log('mounted');
    this.setState({
      sportsEvents: formatEvents(events, extractFormattedDate)
    });
  };

  toggleBetModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen : !modalOpen });
    this.props.proposeBet({});
  };

  render() {
    const { sportsEvents, date } = this.state;
    console.log('sportsEvents', sportsEvents);
    console.log('events', events);
    //console.log('date', sportsEvents[extractFormattedDate(date)]);
    const compiledEvents =
      sportsEvents ? compileEvents(sportsEvents[extractFormattedDate(date)]) : [];

      console.log('compiledEvents', compiledEvents);
    return (
      <div>
        <Provider value={{handleToggleModal: this.toggleBetModal}}>
          <h3>Today's Events</h3>
          {<SportsListing events={compiledEvents ? compiledEvents : [] } />}
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
export default connect(mapStateToProps, mapDispatchToProps) (menuWrapper(DailyEvents));