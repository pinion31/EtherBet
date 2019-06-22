import React from 'React';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Consumer } from '../ContextStore';
import Typography from '@material-ui/core/Typography';

const InlineTeam = ({index, event}) => (
  <div>
    <span>
      <Typography variant="body1" component="h3" inline={true} >
        {!index && `${event.teams[index].name}`}
        {index == 1 && `@${event.teams[index].name}`}
      </Typography>
      <Typography variant="body1" component="p"  inline={true} style={{fontWeight: 'bold'}}>
      {` (${event.teams_normalized[index].record}) `}
      </Typography>
      <Typography variant="subtitle2" component="p"  inline={true} style={{fontStyle: 'italic'}}>
        {event.teams[index].is_away && "Away"}
        {event.teams[index].is_home && "Home"}
      </Typography>
      <Typography
        variant="subtitle2"
        component="p"
        inline={true}
        style={{fontWeight: 'bold', float: 'right'}}
        align='right'
      >
        {event.teams[index].is_away && event.score.score_away}
        {event.teams[index].is_home && event.score.score_away}
      </Typography>
    </span>
  </div>
);

const SportsEvent = ({event, index}) => (
  <div style={{margin: 10, padding: 10}}>
    <Consumer>
     { ({handleToggleModal}) =>
     <Card elevation={1}>
      <CardContent>
        <div style={{margin: 10, padding: 10}}>
          <InlineTeam index={0} event={event} />
          <InlineTeam index={1} event={event} />
          <Button onClick={() => handleToggleModal(index)} style={{margin: 10, padding: 10}} variant="contained" color="primary">
            Create Bet
          </Button>
        </div>
      </CardContent>
    </Card>
     }
    </Consumer>
  </div>
);

export default SportsEvent;