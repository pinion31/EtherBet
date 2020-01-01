/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import { getUser, logoutUser } from '../../actions/UserActions';
import LoginModal from './LoginModal.jsx';
import Footer from './Footer.jsx';
import CreateBetModal from './CreateBetModal.jsx';
import {
  formatEvents, extractFormattedDate, formatEventsById, validateFieldsAreNotBlank } from '../../helpers/helpers';
import {
  nav, navLoggedIn, logo, loggedInBar,
} from '../css/LoginBar.css';


class LoginBar extends React.Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    loginModalErrorMessage: '',
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

  loginUser = (isModal = false) => {
    if (this.verifyLogin()) {
      const { username, password } = this.state;
      this.props.getUser(username, password)
        .then(({ status, error }) => {
          if (status == 200) {
            if (error) return this.setState({ errorMessage: error });
            console.log('is Modal', isModal);
            return isModal ? this.props.history.push('/') : this.props.history.push('/todays-events');
          }
          this.setState({ errorMessage: error });
        });
    }
  };

  logOutUser = () => {
    this.props.logoutUser();
    this.props.history.push('/');
  };

  render() {
    const { errorMessage, loginModalErrorMessage } = this.state;
    const { user, modalOpen, toggleLoginModal, events, selectedEventKey } = this.props;
    const compiledEvents = formatEventsById(events || []);

    // check for user.id is temporary; replace for user session
    return (
      <>
        <nav className={user.id ? navLoggedIn : nav}>
          <div className={logo}>
            <p>Etherbet</p>
          </div>
          {
            !user.id && (
            <div>
              <button type="submit" onClick={() => this.props.history.push('/sign-up')}>Sign Up</button>
              <button type="submit" onClick={() => this.loginUser()}> Login </button>
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
        { modalOpen && !user.id && (
          <LoginModal
            modalOpen
            toggleLoginModal={toggleLoginModal}
            loginUser={this.loginUser}
            errorMessage={loginModalErrorMessage}
            handleChange={this.handleChange}
          />
        )
        }
        { modalOpen && user.id && (
          <CreateBetModal
            modalOpen
            toggleBetModal={toggleLoginModal}
            selectedEvent={selectedEventKey}
            events={compiledEvents}
          />
        )
        }
        {this.props.children}
        {/* <Footer /> */}
      </>
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
    logoutUser,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginBar));
