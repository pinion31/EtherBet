import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

/*const useStyles = makeStyles(theme => ({
  root: {
    display: '',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
*/

class MenuBar extends React.Component {
  state = {
    openMenu: false,
  };

  toggleSideMenu = () => {
    const { openMenu } = this.state;
    this.setState({ openMenu: !openMenu});
  }

  render() {
    const { openMenu } = this.state;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Menu" onClick={this.toggleSideMenu} >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{flexGrow: 2}}>
          </Typography>
          <Button style={{display: 'flex'}}color="inherit">Login</Button>
        </Toolbar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={openMenu}
        >
            <div>
              <IconButton onClick={this.toggleSideMenu} >
                {<ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <Link to={'/todays-events'}>
                <ListItem button>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary={'Today\'s Events'} />
                </ListItem>
              </Link>
              <Link to={'/home'}>
                <ListItem button>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary={'Browse Events'} />
                </ListItem>
              </Link>
              <Link to={'/your-bets'}>
                <ListItem button>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary={'Your Bets'} />
                </ListItem>
              </Link>
              <Link to={'/stats'}>
                <ListItem button>
                  <ListItemIcon><InboxIcon /></ListItemIcon>
                  <ListItemText primary={'Stats'} />
                </ListItem>
              </Link>

              {/*['Today\'s Events', 'Browse Events', 'Your Bets','Stats'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))*/}
            </List>
          </Drawer>
      { this.props.children }
      </AppBar>
    );
  }
};

export default MenuBar;