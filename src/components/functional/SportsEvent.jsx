import React from 'react';
import moment from 'moment';
import { Consumer } from '../ContextStore';
import styles from '../css/SportsEvent.css';

const InlineTeam = ({ index, event }) => (
  <div>
    <span>
      <p className={styles.teamScore}>
        {!index && event.scoreAway}
        {index == 1 && event.scoreHome}
      </p>
      <div className={styles.teamInfo}>
        <h3 className={styles.teamNames}>
          {!index && `${event.teamOneName}`}
          {index == 1 && `@${event.teamTwoName}`}
        </h3>
        <p className={styles.teamRecord}>(0-0)</p>
        <p className={styles.teamLocation}>
          {!index && event.teamOneIsAway && 'Away'}
          {!index && event.teamOneIsHome && 'Home'}
          {index == 1 && event.teamTwoIsHome && 'Home'}
          {index == 1 && event.teamTwoIsAway && 'Away'}
        </p>
      </div>
    </span>
  </div>
);

const checkIfEventStarted = ({ eventDate }) => Date.now() < new Date(eventDate);

const SportsEvent = ({ event, index }) => (
  <div className={styles.eventCard}>
    <Consumer>
      { ({ handleToggleModal }) => (
        <div>
          <InlineTeam index={0} event={event} />
          <InlineTeam index={1} event={event} />
          { <h5 className={styles.eventDate}>{`${moment(event.eventDate).format('LLLL')} CT`}</h5>}
          { checkIfEventStarted(event)
                && (
                <button type="submit" className="smButton" onClick={() => handleToggleModal(index, event)}>
              Create Bet
                </button>
                )
              }
        </div>
      )}
    </Consumer>
  </div>
);

export default SportsEvent;
