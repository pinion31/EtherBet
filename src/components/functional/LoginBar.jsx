import React from 'react';
import Footer from './Footer.jsx';
import { nav, logo } from '../css/LoginBar.css';

class LoginBar extends React.Component {
  state = {
  }

  render() {
    return (
      <React.Fragment>
        <nav className={nav}>
          <div className={logo}>
            <p>Etherbet</p>
          </div>
          <div>
            <button type="submit" onClick={() => this.props.history.push('/sign-up')}>Join </button>
            <button type="submit" onClick={() => this.props.history.push('/login')}>Login </button>
            <input />
            <input />
          </div>
        </nav>
        {this.props.children}
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

export default LoginBar;
