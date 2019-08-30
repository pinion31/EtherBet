import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import injectSheet from 'react-jss';
import { greenSecondary0 } from '../../constants/colors';

const styles = {
  appBar: {
    backgroundColor: 'white',
    boxShadow: 'none',

  },
  toolBar: {
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: greenSecondary0,
    width: 80,
    justifyContent: 'center',
    color: 'white',
  },
};


class LoginBar extends React.Component {
  state = {
  }

  render() {
    const { classes: { appBar, loginButton, toolBar } } = this.props;
    return (
      <div>
        <AppBar position="static" className={appBar}>
          <Toolbar className={toolBar}>
            <Typography variant="h6">
            Etherbet
            </Typography>
            <Button
              onClick={() => this.props.history.push('/login')}
              className={loginButton}
            >
            Login
            </Button>
          </Toolbar>
          {this.props.children}
        </AppBar>
      </div>
    );
  }
}

export default injectSheet(styles)(LoginBar);
