/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import { createUser } from '../actions/UserActions';
import { validateFieldsAreNotBlank, validateFieldsMatch } from '../helpers/helpers';
import LoginBar from './functional/LoginBar.jsx';
import styles from './css/Signup.css';

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
    return (
      <LoginBar history={this.props.history}>
        <form className={styles.signupParent}>
          <div className="flexInputContainerParent">
            <div className="flexInputContainer">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                margin="dense"
                data-testid="username-signup"
                id="username"
                label="Username"
                onChange={this.handleChange}
              />
            </div>
            <div className="flexInputContainer">
              <label htmlFor="password1">Password</label>
              <input
                type="password"
                margin="dense"
                data-testid="password-signup"
                id="password1"
                label="Password"
                onChange={this.handleChange}
              />
            </div>
            <div className="flexInputContainer">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                margin="dense"
                data-testid="confirm-signup"
                id="password2"
                label="Confirm Password"
                onChange={this.handleChange}
              />
            </div>
            <div className="flexInputContainer">
              <label htmlFor="address">Ether Address</label>
              <input
                type="password"
                margin="dense"
                data-testid="address-signup"
                id="address"
                label="Ether Address"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div>
            <p>{errorMessage}</p>
          </div>
        </form>
        <div>
          <button onClick={this.submitUser} className="smButton signUpButton">
              Sign up
          </button>
        </div>
      </LoginBar>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createUser,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signup);
