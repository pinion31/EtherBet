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
    receiverLogin: '',
    wager: '0',
    teamSelectedToWin: 'Select Winner',
    errorMessage: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errorMessage: '',
    });
  };
  
  packBet = () => {
    const { events,selectedEvent, user } = this.props;
    const {event_date, sport_id, event_id, teams} = events[selectedEvent];
    const {name: teamOne} = teams[0];
    const {name: teamTwo} = teams[1];
    const { receiverLogin, wager, teamSelectedToWin } = this.state;

    return {
      receiver: receiverLogin,
      wager,
      teamSelectedToWin,
      senderId: user.id,
      eventDate: event_date,
      sportId: sport_id,
      eventId: event_id,
      teamOne,
      teamTwo,
      betCreator: user.id,
    };
  };

  sendBet = () => {
    this.props.proposeBet(this.packBet(), ({error}) => {
      if (error) {
        return this.setState({errorMessage: error});
      }
      this.props.toggleBetModal();
    });
  }
  render() {
    const {modalOpen, toggleBetModal, events, selectedEvent } = this.props;
    const {teamSelectedToWin, errorMessage} = this.state;

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
        <h5>{errorMessage}</h5>
      </Dialog>
    </React.Fragment>);
  }
}

function mapStateToProps({bets, events, user}) {
  return {
    bets,
    user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    proposeBet,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateBetModal);