import React from 'React';
import SportsBar from './functional/SportsBar.jsx';
import { sports } from '../../__tests__/responses/sports'; // temporary; replace with API call
import { events } from '../../__tests__/responses/NBA_events';


class Home extends React.Component {
  state = {
    value:0,
    sportsList: [],
    sportsEvents: [],
  };

  componentDidMount = () => {
    this.setState({sportsList: sports, sportsEvents: events  });
  };

  handleChange = (event,value) => {
    this.setState({value});
  };

render() {
  const { value, sportsList, sportsEvents } = this.state;
  return (
    <div style={{backgroundColor: 'red'}}>
      <SportsBar
        tabIndex={value}
        sportsList={sportsList}
        handleChange={this.handleChange}
        sportsEvents={sportsEvents}
       />
    </div>
  );
}
}

export default Home;