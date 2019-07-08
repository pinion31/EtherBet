import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

const BetCard = ({
  bet, type, acceptBet, index, opponent,
}) => (
  <React.Fragment>
    <Card elevation={1}>
      <CardContent>
        <div style={{ margin: 10, padding: 10, backgroundColor: 'gray' }}>
          <Typography variant="body1" component="h3" inline={false} align="right">
            {`Date of Event: ${formatDate(bet.dateOfEvent)}`}
          </Typography>
          <Typography variant="subtitle2" component="h3" inline={false}>
            {`${bet.teamOne} vs ${bet.teamTwo}`}
          </Typography>
          <Typography variant="body1" component="h3" inline={false}>
            {`Wager: ${bet.wager} eth`}
          </Typography>
          <Typography variant="body1" component="h3" inline={false}>
            {`Betting Against: ${opponent}`}
          </Typography>
          <Typography variant="body1" component="h3" inline={false}>
            {`Bet: ${bet.teamSelectedToWin} to win by 10pts`}
          </Typography>
          <Typography variant="body1" component="h3" inline={false}>
            {`Status: ${bet.status}`}
          </Typography>
          {
            type === 'OFFER' && (
            <React.Fragment>
              <Button onClick={() => acceptBet(index, 'ACCEPTED')} color="primary">
            Accept Bet
              </Button>
              <Button onClick={() => acceptBet(index, 'REJECTED')} color="primary">
            Reject Bet
              </Button>
            </React.Fragment>
            )
          }
          <Typography
            variant="body1"
            component="h3"
            inline={false}
            align="right"
          >
           Odds
          </Typography>
        </div>
      </CardContent>
    </Card>
  </React.Fragment>
);

export default BetCard;
