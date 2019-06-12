import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { validateFieldsAreNotBlank, validateFieldsMatch } from '../helpers/helpers';

class Signup extends React.Component {
  state = {
    username: '',
    password1: '',
    password2: '',
    address: '',
    errorMessage:'',
  }

  handleChange = (event, value) => {
    this.setState({
      [event.target.id] : event.target.value,
      errorMessage: '',
    });
  }

  verifyUser = () => {
    const { username, password1, password2, address } = this.state;
    const user = { username, password1, password2, address };
    return (
      validateFieldsAreNotBlank(user, () => this.setState({ errorMessage: 'Please complete all fields.'})) &&
      validateFieldsMatch(password1, password2, () => this.setState({ errorMessage: 'Passwords do not match.'}))
    );
  };

  submitUser = () => {
    if (this.verifyUser()) {
      fetch('/users/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state), 
      })
      .then((res) => res.json())
      .then((result) => {

        console.log('done2', result);
      });
    }

  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div>
        <div>
          <TextField
            autoFocus
            name="username"
            margin="dense"
            id="username"
            label="Username"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="password1"
            label="Password"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="password2"
            label="Confirm Password"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Ether Address"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <p>{errorMessage}</p>
        </div>
        <div>
          <Button onClick={this.submitUser} color="primary">
            Sign up
          </Button>
        </div>
      </div>
    );
  }

}

export default Signup;