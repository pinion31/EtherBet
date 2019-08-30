import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import { getUser } from '../actions/UserActions';
import { validateFieldsAreNotBlank } from '../helpers/helpers';
import LoginBar from './functional/LoginBar.jsx';

const styles = {
  inputField: {
    margin: '0 10px',
  },
  loginParent: {
    marginTop: '20%',
    alignSelf: 'center',
    color: 'black',
  },
  errorMessageStyle: {
    width: '100%',
    float: 'right',
    margin: '0 10%',
    height: '23px',
  },
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
    const { classes: { inputField, errorMessageStyle, loginParent } } = this.props;
    return (
      <LoginBar>
        <div className={loginParent}>
          <div className={inputField}>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              onChange={this.handleChange}
            />
          </div>
          <div className={inputField}>
            <TextField
              autoFocus
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
          <div>
            <Button onClick={this.loginUser} color="primary">
              Login
            </Button>
          </div>
          <div>
            <Button onClick={() => this.props.history.push('/sign-up')} color="primary">
              Create Account
            </Button>
          </div>
        </div>
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
