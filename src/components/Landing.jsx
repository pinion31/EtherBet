import React from 'react';
import LoginBar from './functional/LoginBar.jsx';

class Landing extends React.Component {
  state = {
  }

  render() {
    return (
      <LoginBar history={this.props.history}>
        <h1>Hellow</h1>
      </LoginBar>
    );
  }
}

export default Landing;
