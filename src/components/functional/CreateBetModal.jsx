import React from 'React';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { proposeBet } from '../../actions/betActions';



class CreateBetModal extends React.Component {
  state = {
    senderId: '',
    receiverLogin: '',
    wager: '0',
    teamSelectedToWin: 'Select Winner',
  }

  handleChange = (event) => {
    console.log('event.target', event.target);
    this.setState({ [event.target.name]: event.target.value });
  };
  
  packBet = () => {
    const { events,selectedEvent } = this.props;
    const {event_date, sport_id, event_id, teams} = events[selectedEvent];
    const {name: teamOne} = teams[0];
    const {name: teamTwo} = teams[1];
    const { receiverLogin, wager, teamSelectedToWin, senderId } = this.state;
    return {
      receiver: receiverLogin,
      wager,
      teamSelectedToWin,
      senderId,
      eventDate: event_date,
      sportId: sport_id,
      eventId: event_id,
      teamOne,
      teamTwo,
    };
  };

  sendBet = () => {
    this.props.toggleBetModal();
    this.props.proposeBet(this.packBet());

  }
  render() {
    const {modalOpen, toggleBetModal, events, selectedEvent } = this.props;
    const {teamSelectedToWin} = this.state;

    console.log('event shape', events[selectedEvent]);
    console.log('state', this.state);
    return (
      <React.Fragment>
      <Dialog
        open={modalOpen}
        onClose={toggleBetModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Invite A Friend To Bet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bet:
          </DialogContentText>
         <Select
          value={teamSelectedToWin}
          onChange={this.handleChange}
          inputProps={{
            name: 'teamSelectedToWin',
            id: 'teamSelectedToWin',
          }}>
            {
              events && events[selectedEvent] &&
                events[selectedEvent].teams.map(team => <MenuItem key={team.team_id} value={team.name}>{team.name}</MenuItem>)
            }
        </Select>
          <DialogContentText>
            Wagering:
          </DialogContentText>
          <TextField
            onChange={this.handleChange}
            autoFocus
            type="number"
            margin="dense"
            name="wager"
            label="Amount in Wei"
          />
          <DialogContentText>
            Friend to offer bet:
          </DialogContentText>
          <TextField
            onChange={this.handleChange}
            autoFocus
            margin="dense"
            name="receiverLogin"
            label="Login of Friend"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleBetModal} color="primary">
            Cancel
          </Button>
          <Button onClick={this.sendBet} color="primary">
            Propose Bet
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>);
  }
}

function mapStateToProps({bets, events, user}) {
  return {
    bets,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    proposeBet,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateBetModal);