import React from 'react';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import { getBets } from '../actions/betActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BetCard from './functional/BetCard.jsx';

class Bets extends React.Component {
  state = {

  }

  componentDidMount = () => {
    this.props.getBets();

  };

  render() {
    return (
      <div>
        <BetCard />
        <BetCard />
        <BetCard />
      </div>
    );
  }

}

function mapStateToProps({bets, events, sports}) {
  return {
    bets,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBets,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(menuWrapper(Bets));