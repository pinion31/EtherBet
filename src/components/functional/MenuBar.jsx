import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import {
  smButton, appBar, toolBar,
} from '../css/baseStyles.js';

const styles = {
  smButton,
  appBar,
  toolBar,
  toolbarText: {
    fontFamily: 'PT Sans Narrow',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.25em',
    letterSpacing: 2,
  },
};

class MenuBar extends React.Component {
  state = {
  };

  render() {
    const {
      classes: {
        appBar, toolBar, toolbarText, smButton,
      },
    } = this.props;
    return (
      <AppBar position="static" className={appBar}>
        <Toolbar className={toolBar}>
          <Typography variant="h6">
            Etherbet
          </Typography>
          <Link to="/todays-events" className={toolbarText}><h5>{'Today\'s Events'}</h5></Link>
          <Link to="/home" className={toolbarText}><h5>Browse Events</h5></Link>
          <Link to="/your-bets" className={toolbarText}><h5>Your Bets</h5></Link>
          <Button className={smButton}>Log Out</Button>
        </Toolbar>
        { this.props.children }
      </AppBar>
    );
  }
}

export default injectSheet(styles)(MenuBar);
