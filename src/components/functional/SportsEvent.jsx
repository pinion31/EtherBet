import React from 'React';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const SportsEvent = ({event}) => (
  <div style={{margin: 10, padding: 10}}>
     <Paper elevation={1}>
      <div style={{margin: 10, padding: 10}}>
        <Typography variant="h5" component="h3">
          { event.teams[0].name }
        </Typography>
        <Typography variant="h5" component="h3">
          { `@${event.teams[1].name}` }
        </Typography>
      </div>
    </Paper>
  </div>
);

export default SportsEvent;