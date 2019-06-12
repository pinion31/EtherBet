import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Consumer } from '../ContextStore';
import Typography from '@material-ui/core/Typography';

const BetCard = (props) => (
  <React.Fragment>
    <Card elevation={1}>
      <CardContent>
        <div style={{margin: 10, padding: 10, backgroundColor: 'gray'}}>
          <Typography variant="subtitle2" component="h3" inline={false} >
           NBA Finals Game 1
          </Typography>
          <Typography variant="body1" component="h3" inline={false} >
           05-12-19
          </Typography>
          <Typography variant="body1" component="h3" inline={false} >
           Wager: 10 eth
          </Typography>
          <Typography variant="body1" component="h3" inline={false} >
           Against: Chris
          </Typography>
          <Typography variant="body1" component="h3" inline={false} >
           Bet: Golden State to win by 10pts
          </Typography>
          <Typography
              variant="body1"
              component="h3"
              inline={false}
              align='right'
          >
           Odds
          </Typography>
        </div>
      </CardContent>
    </Card>
  </React.Fragment>
);

export default BetCard;