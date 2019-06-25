import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'; // 5.0.5 version must be used to avoid invariant react hook error
import { bindActionCreators } from 'redux';
import { getUser } from '../actions/UserActions';
import { validateFieldsAreNotBlank } from '../helpers/helpers';

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
      this.props.getUser()
        .then(({ status }) => {
          if (status == 200) {
            this.props.history.push('/todays-events');
          }
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
            id="password"
            label="Password"
            onChange={this.handleChange}
          />
        </div>
        <h5>{errorMessage}</h5>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
