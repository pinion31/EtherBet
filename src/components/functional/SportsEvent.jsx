import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { Consumer } from '../ContextStore';
import styles from '../css/SportsEvent.css';

// temp
// Date.now = () => new Date(Date.UTC(2019, 6, 21, 0)).valueOf();

// const InlineTeam = ({ index, event }) => (
//   <div>
//     <span>
//       <Typography variant="body1" component="h3" inline>
//         {!index && `${event.teamOneName}`}
//         {index == 1 && `@${event.teamTwoName}`}
//       </Typography>
//       <Typography variant="body1" component="p" inline style={{ fontWeight: 'bold' }}>
//         {'Add record of team '}
//       </Typography>
//       <Typography variant="subtitle2" component="p" inline style={{ fontStyle: 'italic' }}>
//         {!index && event.teamOneIsAway && 'Away'}
//         {!index && event.teamOneIsHome && 'Home'}
//         {index == 1 && event.teamTwoIsHome && 'Home'}
//         {index == 1 && event.teamTwoIsAway && 'Away'}
//       </Typography>
//       <Typography
//         variant="subtitle2"
//         component="p"
//         inline
//         style={{ fontWeight: 'bold', float: 'right' }}
//         align="right"
//       >
//         {!index && event.scoreAway}
//         {index == 1 && event.scoreHome}
//       </Typography>
//     </span>
//   </div>
// );

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
                <button className="smButton" onClick={() => handleToggleModal(index, event)}>
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
