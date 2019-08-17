import React from 'React';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import SportsBar from './functional/SportsBar.jsx';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import CreateBetModal from './functional/CreateBetModal.jsx';
import { proposeBet } from '../actions/BetActions';
import { getEventsForDay } from '../actions/eventActions';
import { getSports } from '../actions/SportActions';
import { Provider } from './ContextStore.js';
import { formatEvents, extractFormattedDate } from '../helpers/helpers';

class Home extends React.Component {
  state = {
    value: 0,
    modalOpen: false,
    selectedDate: '',
    selectedEventKey: '',
  };

  componentDidMount = () => {
    this.props.getSports();
  };

  toggleBetModal = (key, event) => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
      selectedEventKey: !modalOpen ? key : -1,
    });
  };

  handleChange = (event, value) => this.setState({ value });

  handleChangeDate = (date, value) => {
    const formattedDate = extractFormattedDate(date);
    this.props.getEventsForDay(formattedDate)
      .then(({ status }) => {
        if (status == 200) {
          this.setState({ selectedDate: extractFormattedDate(date) });
        }
      });
  };

  render() {
    const {
      value, modalOpen, selectedDate, selectedEventKey,
    } = this.state;

    const { events, sports: sportsList } = this.props;
    const sportsEvents = formatEvents(events, extractFormattedDate);
    return (
      <div style={{ backgroundColor: 'red' }}>
        <Provider value={{ handleToggleModal: this.toggleBetModal }}>
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
            selectedEvent={selectedEventKey}
            events={selectedDate ? sportsEvents[selectedDate][value + 1] : []}
          />
        </Provider>
      </div>
    );
  }
}

function mapStateToProps({ bets, events, sports }) {
  return {
    bets,
    events,
    sports,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    proposeBet,
    getSports,
    getEventsForDay,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(menuWrapper(Home));
