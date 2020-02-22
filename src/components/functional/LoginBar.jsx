/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { withRouter } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import { getUser, logoutUser } from '../../actions/UserActions';
// import LoginModal from './LoginModal.jsx';
import LoginModal from './LoginModal.jsx';
import ErrorModal from './ErrorModal.jsx';
import Footer from './Footer.jsx';
import CreateBetModal from './CreateBetModal.jsx';
import {
  formatEventsById, validateFieldsAreNotBlank } from '../../helpers/helpers';
import {
  nav, navNoMargin, navLoggedIn, navLoggedInNoMargin, logo, loggedInBar, login, featureImages,sideMenu,
} from '../css/LoginBar.css'; // TO DO: remove nav from CSS; might be dead code


class LoginBar extends React.Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    loginModalErrorMessage: '',
    errorModalOpen: false,
    showSideMenu: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      errorModalOpen: false,
      errorMessage: '',
    });
  };

  handleSideMenu = () => {
    const { showSideMenu } = this.state;
    this.setState({
      errorModalOpen: false,
      showSideMenu: !showSideMenu,
    });
  };

  handleModalOpen = (isOpen, message) => {
    this.setState({ errorModalOpen: isOpen, errorMessage: message });
  };

  verifyLogin = () => {
    const {
      username, password,
    } = this.state;

    return (
      validateFieldsAreNotBlank({ username, password }, () => this.handleModalOpen(true, 'Please complete all fields.'))
    );
  };

  loginUser = (isModal = false) => {
    if (this.verifyLogin()) {
      const { username, password } = this.state;
      this.props.getUser(username, password)
        .then(({ status, error }) => {
          if (status == 200) {
            if (error) return this.handleModalOpen(true, error);
            return isModal ? this.props.history.push('/') : this.props.history.push('/todays-events');
          }
          return this.handleModalOpen(true, error);
        });
    }
  };

  logOutUser = () => {
    const { id } = this.props.user;
    this.props.logoutUser(id).then(({ status }) => {
      if (status == 200) {
        return this.props.history.push('/');
      }
      return this.handleModalOpen(true, 'Error logging out user');
    });
  };

  getNavClass = (user) =>  {
    if (user.id) { // not logged in
      if (this.props.location.pathname == '/') { // on landing page
        return navLoggedIn;
      }
      return navLoggedInNoMargin;
    }
    return navNoMargin;
  }

  displaySideMenu = () => (
    <div
      className={''}
      style={{backgroundColor: 'black'}}
      role="presentation"
      onClick={this.handleSideMenu}
      onKeyDown={this.handleSideMenu}
    >
      <List style={{backgroundColor: 'red'}}>
        <ChevronLeftIcon />
        <ListItem onClick={() => this.props.history.push('/todays-events')}>{'Today\'s Events'}</ListItem>
        <ListItem onClick={() => this.props.history.push('/home')}>Browse Events</ListItem>
        <ListItem onClick={() => this.props.history.push('/your-bets')}>Your Bets</ListItem>
        <ListItem onClick={this.logOutUser}>Log Out</ListItem>
      </List>
    </div>
  );

  render() {
    const { errorMessage, loginModalErrorMessage, errorModalOpen, showSideMenu } = this.state;
    const { user, modalOpen, toggleLoginModal, events, selectedEventKey } = this.props;
    const compiledEvents = formatEventsById(events || []);

    // check for user.id is temporary; replace for user session
    return (
      <>
        <nav className={this.getNavClass(user)}>
          <div className={logo}>
            <div className={sideMenu}>
              <IconButton onClick={this.handleSideMenu}>
                <MenuIcon />
              </IconButton>
            </div>
            <p>Etherbet</p>
          </div>
          { this.props.location.pathname == '/' && (
            <div className={featureImages}>
              <img alt="sport" src="http://placekitten.com/g/400/400" />
            </div>
          )
          }
          {
            !user.id && (
            <div className={login}>
              <button type="submit" onClick={() => this.props.history.push('/sign-up')}>Sign Up</button>
              <button type="submit" onClick={() => this.loginUser()}> Login </button>
              <input
                name="username"
                margin="dense"
                data-testid="username-bar"
                id="username"
                label="Username"
                onChange={this.handleChange}
              />
              <input
                name="password"
                margin="dense"
                data-testid="password-bar"
                id="password"
                label="Password"
                onChange={this.handleChange}
              />
            </div>
            )
          }
          {
            user.id && (
            <>
              <div>
                <SwipeableDrawer
                  open={showSideMenu}
                  onClose={this.handleSideMenu}
                  onOpen={this.handleSideMenu}
                >
                  {this.displaySideMenu()}
                </SwipeableDrawer>
              </div>
              <div className={loggedInBar}>
                <h3 type="submit" onClick={() => this.props.history.push('/todays-events')}>{'Today\'s Events'}</h3>
                <h3 type="submit" onClick={() => this.props.history.push('/home')}>Browse Events</h3>
                <h3 type="submit" onClick={() => this.props.history.push('/your-bets')}>Your Bets</h3>
                <button type="submit" data-testid="wide-logout" onClick={this.logOutUser}> Log Out </button>
              </div>
            </>
            )
          }
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
        <ErrorModal modalOpen={errorModalOpen} toggleModal={() => this.handleModalOpen(false, errorMessage)} message={errorMessage} />
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
