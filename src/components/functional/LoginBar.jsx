import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import { getUser } from '../../actions/UserActions';
import Footer from './Footer.jsx';
import {
  nav, navLoggedIn, logo, loggedInBar,
} from '../css/LoginBar.css';
import { validateFieldsAreNotBlank } from '../../helpers/helpers';

class LoginBar extends React.Component {
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

  logOutUser = () => {
    // log out user here
  };

  render() {
    const { errorMessage } = this.state;
    const { user } = this.props;
    // check for user.id is temporary; replace for user session
    return (
      <React.Fragment>
        <nav className={user.id ? navLoggedIn : nav}>
          <div className={logo}>
            <p>Etherbet</p>
          </div>
          {
            !user.id && (
            <div>
              <button type="submit" onClick={() => this.props.history.push('/sign-up')}>Sign Up</button>
              <button type="submit" onClick={this.loginUser}> Login </button>
              <input
                name="username"
                margin="dense"
                id="username"
                label="Username"
                onChange={this.handleChange}
              />
              <input
                name="password"
                margin="dense"
                id="password"
                label="Password"
                onChange={this.handleChange}
              />
            </div>
            )
          }
          {
            user.id && (
            <div className={loggedInBar}>
              <h3 type="submit" onClick={() => this.props.history.push('/todays-events')}>{'Today\'s Events'}</h3>
              <h3 type="submit" onClick={() => this.props.history.push('/home')}>Browse Events</h3>
              <h3 type="submit" onClick={() => this.props.history.push('/your-bets')}>Your Bets</h3>
              <button type="submit" onClick={this.logOutUser}> Log Out </button>
            </div>
            )
          }
          <div
            className="errorMessageStyle"
            style={{ display: errorMessage ? 'block' : 'none' }}
          >
            <h5>{errorMessage}</h5>
          </div>
        </nav>
        {this.props.children}
        {/* <Footer /> */}
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginBar));
