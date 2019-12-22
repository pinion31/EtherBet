import React from 'react';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import { getUser } from '../actions/UserActions';
import { validateFieldsAreNotBlank } from '../helpers/helpers';
import LoginBar from './functional/LoginBar.jsx';
import {
  smButton, lgButton, errorMessageStyle, flexInputContainer, flexAlignHorizontal,
} from './css/baseStyles.js';

const styles = {
  loginParent: {
    marginTop: '20%',
    alignSelf: 'center',
    color: 'white',
  },
  flexInputContainer,
  flexAlignHorizontal,
  errorMessageStyle,
  lgButton,
  smButton,
};

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      errorMessage: '',
    });
  };

  verifyLogin = () => {
    const {
      username, password,
    } = this.state;

    return (
      validateFieldsAreNotBlank({ username, password }, () => this.setState({ errorMessage: 'Please complete all fields.' }))
    );
  };

  loginUser = () => {
    if (this.verifyLogin()) {
      const { username, password } = this.state;
      this.props.getUser(username, password)
        .then(({ status, error }) => {
          if (status == 200) {
            if (error) return this.setState({ errorMessage: error });
            return this.props.history.push('/todays-events');
          }
          this.setState({ errorMessage: error });
        });
    }
  };

  render() {
    const { errorMessage } = this.state;
    const {
      classes: {
        errorMessageStyle, loginParent, flexInputContainer, smButton, lgButton, flexAlignHorizontal,
      },
    } = this.props;
    return (
      <LoginBar history={this.props.history}>
        <form className={loginParent}>
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
            <label htmlFor="Password">Password</label>
            <input
              margin="dense"
              id="password"
              label="Password"
              onChange={this.handleChange}
            />
          </div>
          <div
            className={errorMessageStyle}
            style={{ display: errorMessage ? 'block' : 'none' }}
          >
            <h5>{errorMessage}</h5>
          </div>
          <div style={{ marginTop: 15 }}>
            <div className={flexAlignHorizontal}>
              <button onClick={this.loginUser} color="primary" className={lgButton}>
                Login
              </button>
            </div>
            <div className={flexAlignHorizontal}>
              <button onClick={() => this.props.history.push('/sign-up')} className={lgButton}>
                Create Account
              </button>
            </div>
          </div>
        </form>
      </LoginBar>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser,
  }, dispatch);
}
export default injectSheet(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));
