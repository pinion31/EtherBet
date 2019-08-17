import React from 'React';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { Consumer } from '../ContextStore';

// temp
// Date.now = () => new Date(Date.UTC(2019, 6, 21, 0)).valueOf();

const InlineTeam = ({ index, event }) => (
  <div>
    <span>
      <Typography variant="body1" component="h3" inline>
        {!index && `${event.teamOneName}`}
        {index == 1 && `@${event.teamTwoName}`}
      </Typography>
      <Typography variant="body1" component="p" inline style={{ fontWeight: 'bold' }}>
        {'Add record of team '}
      </Typography>
      <Typography variant="subtitle2" component="p" inline style={{ fontStyle: 'italic' }}>
        {!index && event.teamOneIsAway && 'Away'}
        {!index && event.teamOneIsHome && 'Home'}
        {index == 1 && event.teamTwoIsHome && 'Home'}
        {index == 1 && event.teamTwoIsAway && 'Away'}
      </Typography>
      <Typography
        variant="subtitle2"
        component="p"
        inline
        style={{ fontWeight: 'bold', float: 'right' }}
        align="right"
      >
        {!index && event.scoreAway}
        {index == 1 && event.scoreHome}
      </Typography>
    </span>
  </div>
);

const checkIfEventStarted = ({ eventDate }) => Date.now() < new Date(eventDate);

const SportsEvent = ({ event, index }) => (
  <div style={{ margin: 10, padding: 10 }}>
    <Consumer>
      { ({ handleToggleModal }) => (
        <Card elevation={1}>
          <CardContent>
            <div style={{ margin: 10, padding: 10 }}>
              <InlineTeam index={0} event={event} />
              <InlineTeam index={1} event={event} />
              { <h5 style={{ color: 'black' }}>{`${moment(event.eventDate).format('LLLL')} CT`}</h5>}
              { checkIfEventStarted(event)
                && (
                <Button onClick={() => handleToggleModal(index, event)} style={{ margin: 10, padding: 10 }} variant="contained" color="primary">
              Create Bet
                </Button>
                )
              }
            </div>
          </CardContent>
        </Card>
      )}
    </Consumer>
  </div>
);

export default SportsEvent;
