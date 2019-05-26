import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends React.Component {
  state = {

  }

  render() {
    return (
      <div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
          />
        </div>
        <div>
          <Button onClick={() => this.props.history.push('/home')} color="primary">
            Login
          </Button>
        </div>
        <div>
          <Button onClick={() => {}} color="primary">
            Create Account
          </Button>
        </div>
      </div>
    );
  }

}

export default Login;