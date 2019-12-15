/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { proposeBet } from '../../actions/BetActions';


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
    const { events, selectedEvent, user } = this.props;
    const {
      // eslint-disable-next-line camelcase
      eventDate, sportId, eventId, teamOneName, teamTwoName,
    } = events[selectedEvent];
    const { receiverLogin, wager, teamSelectedToWin } = this.state;
    return {
      receiver: receiverLogin,
      wager,
      teamSelectedToWin,
      senderId: user.id,
      senderLogin: user.login,
      eventDate,
      sportId,
      eventId,
      teamOne: teamOneName,
      teamTwo: teamTwoName,
      betCreator: user.id,
    };
  };

  checkUserEtherAgainstWager = () => this.props.user.etherAmount > this.state.wager

  sendBet = () => {
    if (!this.checkUserEtherAgainstWager()) {
      return this.setState({ errorMessage: 'You do not have enough funds for this wager.' });
    }
    // eslint-disable-next-line react/destructuring-assignment
    this.props.proposeBet(this.packBet(), ({ error }) => {
      if (error) {
        return this.setState({ errorMessage: error });
      }
      // eslint-disable-next-line react/destructuring-assignment
      this.props.toggleBetModal();
    });
  }

  render() {
    const {
      modalOpen, toggleBetModal, events, selectedEvent,
    } = this.props;
    const { teamSelectedToWin, errorMessage } = this.state;
    return (
      <React.Fragment>
        <Dialog
          open={modalOpen}
          onClose={toggleBetModal}
        >
          <DialogTitle>Invite A Friend To Bet</DialogTitle>
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
              }}
            >
              {
                events && events[selectedEvent]
                && ['One', 'Two'].map(
                  (number, key) => (
                    <MenuItem
                      key={key}
                      value={events[selectedEvent][`team${number}Name`]}
                    >
                      {events[selectedEvent][`team${number}Name`]}
                    </MenuItem>
                  ),
                )
              }
            </Select>
            <DialogContentText>
            Wagering:
            </DialogContentText>
            <TextField
              onChange={this.handleChange}
              data-testid="wager"
              autoFocus
              type="number"
              margin="dense"
              name="wager"
              placeholder="Amount in Wei"
            />
            <DialogContentText>
            Friend to offer bet:
            </DialogContentText>
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="receiverLogin"
              placeholder="Login of Friend"
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
      </React.Fragment>
    );
  }
}

function mapStateToProps({ bets, user }) {
  return {
    bets,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    proposeBet,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateBetModal);
