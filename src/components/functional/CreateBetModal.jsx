import React from 'React';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CreateBetModal = ({modalOpen, toggleBetModal, sendBet}) => {
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
          Enter Address of Friend
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Address"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleBetModal} color="primary">
          Cancel
        </Button>
        <Button onClick={toggleBetModal} color="primary">
          Propose Bet
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
)};

export default CreateBetModal;