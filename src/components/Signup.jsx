import React from 'react';
import injectSheet from 'react-jss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import { createUser } from '../actions/UserActions';
import { validateFieldsAreNotBlank, validateFieldsMatch } from '../helpers/helpers';
import LoginBar from './functional/LoginBar.jsx';
import { smButton, flexInputContainer, errorMessageStyle } from './css/baseStyles.js';

const styles = {
  inputField: {
    margin: '0 10px',
  },
  signupParent: {
    marginTop: '20%',
    alignSelf: 'center',
    color: 'white',
  },
  smButton,
  flexInputContainer,
  errorMessageStyle,
};

class Signup extends React.Component {
  state = {
    username: '',
    password1: '',
    password2: '',
    address: '',
    errorMessage: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      errorMessage: '',
    });
  }

  verifyUser = () => {
    const {
      username, password1, password2, address,
    } = this.state;
    const user = {
      username, password1, password2, address,
    };
    return (
      validateFieldsAreNotBlank(user, () => this.setState({ errorMessage: 'Please complete all fields.' }))
      && validateFieldsMatch(password1, password2, () => this.setState({ errorMessage: 'Passwords do not match.' }))
    );
  };

  submitUser = () => {
    if (this.verifyUser()) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.createUser(this.state)
        .then(({ status }) => {
          if (status == 200) {
            // eslint-disable-next-line react/destructuring-assignment
            return this.props.history.push('/todays-events');
          }
          this.setState({ errorMessage: 'There was an error creating your account.' });
        });
    }
  };

  render() {
    const { errorMessage } = this.state;
    const {
      classes: {
        inputField, errorMessageStyle, signupParent, flexInputContainer, smButton,
      },
    } = this.props;
    return (
      <LoginBar history={this.props.history}>
        <form className={signupParent}>
          <div className={flexInputContainer}>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              margin="dense"
              id="username"
              label="Username"
              onChange={this.handleChange}
            />
          </div>
          <div className={flexInputContainer}>
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              margin="dense"
              id="password1"
              label="Password"
              onChange={this.handleChange}
            />
          </div>
          <div className={flexInputContainer}>
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              margin="dense"
              id="password2"
              label="Confirm Password"
              onChange={this.handleChange}
            />
          </div>
          <div className={flexInputContainer}>
            <label htmlFor="address">Ether Address</label>
            <input
              type="password"
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
            <Button onClick={this.submitUser} className={smButton}>
              Sign up
            </Button>
          </div>
        </form>
      </LoginBar>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createUser,
  }, dispatch);
}

export default injectSheet(styles)(connect(null, mapDispatchToProps)(Signup));
