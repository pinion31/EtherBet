import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const BetCard = ({ bet }) => (
  <React.Fragment>
    <Card elevation={1}>
      <CardContent>
        <div style={{ margin: 10, padding: 10, backgroundColor: 'gray' }}>
          <Typography variant="subtitle2" component="h3" inline={false}>
           NBA Finals Game 1
          </Typography>
          <Typography variant="body1" component="h3" inline={false}>
            {bet.dateOfEvent}
          </Typography>
          <Typography variant="body1" component="h3" inline={false}>
            {`Wager: ${bet.wager} eth`}
          </Typography>
          <Typography variant="body1" component="h3" inline={false}>
           Against: Chris
          </Typography>
          <Typography variant="body1" component="h3" inline={false}>
            {`Bet: ${bet.teamSelectedToWin} to win by 10pts`}
          </Typography>
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
