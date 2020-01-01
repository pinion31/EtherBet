/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const LoginModal = ({
  modalOpen, toggleLoginModal, handleChange, loginUser, errorMessage,
}) => (
  <>
    <Dialog
      open={modalOpen}
      onClose={toggleLoginModal}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
        Login:
        </DialogContentText>
        <TextField
          onChange={handleChange}
          data-testid="username"
          autoFocus
          type="string"
          id="username"
          margin="dense"
          name="username"
          placeholder="User Login"
        />
        <DialogContentText>
        Password:
        </DialogContentText>
        <TextField
          onChange={handleChange}
          autoFocus
          type="password"
          id="password"
          margin="dense"
          name="password"
          placeholder="Password"
        />
      </DialogContent>
      <DialogActions>
        <button className="smButton" onClick={toggleLoginModal} type="submit">
        Cancel
        </button>
        <button className="smButton" onClick={() => loginUser(true)} type="submit">
        Login
        </button>
      </DialogActions>
      <h5>{errorMessage}</h5>
    </Dialog>
  </>
);

export default LoginModal;
