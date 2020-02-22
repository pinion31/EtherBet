/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ErrorModal = ({ modalOpen, toggleModal, message }) => (
  <>
    <Dialog
      open={modalOpen}
      onClose={toggleModal}
    >
      <DialogTitle>
        <div style={{ color: 'black' }} data-testid="error-title-modal">Error!</div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText data-testid="error-content-modal">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button data-testid="error-ok-modal" type="submit" className="smButton" onClick={toggleModal} color="primary">
          OK
        </button>
      </DialogActions>
    </Dialog>
  </>
);

export default ErrorModal;
