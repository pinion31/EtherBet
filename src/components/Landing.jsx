import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import LoginBar from './functional/LoginBar.jsx';
import { getUser } from '../actions/UserActions';
import { validateFieldsAreNotBlank } from '../helpers/helpers';
import styles from './css/Landing.css';
import { getEventsForDay, getEventsForUpcomingDays } from '../actions/EventActions';
import { getSports } from '../actions/SportActions';

const EventCardToday = ({ event: { teamOneName, teamTwoName } }) => (
  <React.Fragment>
    <div className={styles['side-menu-text']}>
      <p>{teamOneName}</p>
      <p>-5(-110)</p>
    </div>
    <p className={styles['side-menu-text']}>vs</p>
    <div className={styles['side-menu-text']}>
      <p>{teamTwoName}</p>
      <p>-5(-110)</p>
    </div>
  </React.Fragment>
);

const formatDateForDisplay = (eventDate) => {
  const formattedDate = new Date(eventDate).toLocaleTimeString('en-US');
  return [...formattedDate.slice(0, -6), ' ', ...formattedDate.slice(-2)].join('');
};

const EventCard = ({ event: { teamOneName, teamTwoName, eventDate }, toggleLoginModal }) => (
  <div className={styles['game-row']}>
    <div>
      <p>{new Date(eventDate).toDateString().slice(0, -5)}</p>
      <p>{formatDateForDisplay(eventDate)}</p>
    </div>
    <div>
      <div>
        <p>{teamOneName}</p>
        <p>at</p>
        <p>{teamTwoName}</p>
      </div>
      <button onClick={toggleLoginModal} type="submit">Bet Now</button>
    </div>
    <div>
      <p>-110</p>
      <p>+110</p>
    </div>
  </div>
);

class Landing extends React.Component {
  state = {
    modalOpen: false,
    selectedEventKey: '',
  }

  componentDidMount = () => {
    this.props.getSports();
    this.props.getEventsForUpcomingDays();
  };

  toggleLoginModal = (key) => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
      selectedEventKey: !modalOpen ? key : -1,
    });
  };

  render() {
    const { events, sports } = this.props;
    const { modalOpen, selectedEventKey } = this.state;
    return (
      <LoginBar events={events} selectedEventKey={selectedEventKey} history={this.props.history} modalOpen={modalOpen} toggleLoginModal={this.toggleLoginModal}>
        <main>
          <div>
            <div className={styles['left-side-menu']}>
              <h2 className={styles['menu-heading']}>{'Today\'s Games'}</h2>
              <div className={styles['game-box']}>
                {
                events && events.map(event => moment(event.eventDate).isSame(new Date(Date.now()), 'day')
                  && <EventCardToday key={event.id} event={event} />)

                }
              </div>
            </div>
            <div className={styles['feature-column']}>
              <div className={styles['feature-images']}>
                <img alt="sport" src="http://placekitten.com/g/150/400" />
                <img alt="sport" src="http://placekitten.com/g/150/400" />
                <img alt="sport" src="http://placekitten.com/g/150/400" />
              </div>
              <div className={styles.featured}>
                <div className={styles['featured-menu-bar']}>
                  <h2> Featured Games</h2>
                </div>
                {
                  sports && sports.sports && sports.sports.map(({ sportName, sportId }) => (
                    <div key={sportId} className={styles['sport-bar']}>
                      <h3>{sportName}</h3>
                      {
                        events && events.map(event => event.sportId == sportId
                          && <EventCard key={event.id} event={event} toggleLoginModal={() => this.toggleLoginModal(event.id)} />)
                      }
                    </div>
                  ))
                }
              </div>
            </div>
            <div className={styles['right-side-menu']}>
              <h2 className={styles['menu-heading']}>Sports News</h2>
              <article className={styles.article}>
                <h4>Bears vs Ram Week 11 Odds</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Duis aute irure dolor in reprehenderit... </p>
                <button type="submit">Read More</button>
              </article>
              <article className={styles.article}>
                <h4>Myles Garrett Suspended Indefinitely</h4>
                <p>Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Leo in vitae turpis massa sed elementum tempus egestas. Sit amet nisl purus in mollis. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Consectetur adipiscing elit ut aliquam purus sit. Morbi quis commodo odio aenean sed. Id donec ultrices tincidunt arcu non sodales neque sodales ut. Rutrum quisque non tellus orci ac auctor augue mauris. Ultrices vitae auctor eu augue. Aliquam sem et tortor consequat id porta nibh venenatis cras. Cursus eget nunc scelerisque viverra. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. In ante metus dictum at tempor commodo. Mi proin sed libero enim sed faucibus turpis in. </p>
                <button type="submit">Read More</button>
              </article>
            </div>
          </div>
        </main>
      </LoginBar>
    );
  }
}

function mapStateToProps({ events, sports, user }) {
  return {
    user,
    events,
    sports,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getEventsForDay,
    getEventsForUpcomingDays,
    getSports,
    getUser,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
