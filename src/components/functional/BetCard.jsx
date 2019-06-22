import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Consumer } from '../ContextStore';
import Typography from '@material-ui/core/Typography';

/*

Object
actualWinner
:
""
betCreator:18
betCreatorHandicap
:
0
betReceiver
:
12
betReceiverHandicap
:
0
createdAt
:
"2019-06-22T15:05:34.780Z"
dateOfEvent
:
"2019-05-12T19:30:00.000Z"
eventId
:
"5c25642185ec4bd28e56e3e975e65c71"
id
:
1
sportId
:
4
status
:
"OFFER PENDING"
teamOne
:
"Portland Trail Blazers"
teamSelectedToWin
:
"Portland Trail Blazers"
teamTwo
:
"Denver Nuggets"
updatedAt
:
"2019-06-22T15:05:34.780Z"
wager
:
101*/

const BetCard = ({bet}) => (
  <React.Fragment>
    <Card elevation={1}>
      <CardContent>
        <div style={{margin: 10, padding: 10, backgroundColor: 'gray'}}>
          <Typography variant="subtitle2" component="h3" inline={false} >
           NBA Finals Game 1
          </Typography>
          <Typography variant="body1" component="h3" inline={false} >
           {bet.dateOfEvent}
          </Typography>
          <Typography variant="body1" component="h3" inline={false} >
           {`Wager: ${bet.wager} eth`}
          </Typography>
          <Typography variant="body1" component="h3" inline={false} >
           Against: Chris
          </Typography>
          <Typography variant="body1" component="h3" inline={false} >
           {`Bet: ${bet.teamSelectedToWin} to win by 10pts`}
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