import React from 'react';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import { getBets } from '../actions/betActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BetCard from './functional/BetCard.jsx';

class Bets extends React.Component {
  state = {
    betsCreated: [],
    betsReceived: [],
  }

  componentDidMount = () => {
    this.props.getBets(this.props.user.id, (bets) => {
      const { betsCreated, betsReceived } = this.sortBets(bets);
      console.log('betsCreated did mount', betsCreated)
      this.setState({ betsCreated, betsReceived });
    });
  };

  sortBets = (bets) => {
    const betsCreated = []
    const betsReceived = [];
    const { id } = this.props.user; 
    
    bets.forEach(bet => {
      if (bet.betCreator == id) betsCreated.push(bet);
      if (bet.betReceiver == id) betsReceived.push(bet);
    });
    console.log('betsCreated', betsCreated)
    return { betsCreated, betsReceived };

  };

  render() {
    const { betsReceived, betsCreated } = this.state;
    console.log('betsCreated state', betsCreated)
    return (
      <div>
        <h2> Bets Created </h2>
        {
          betsCreated.map(bet => <BetCard bet={bet}/>)
        }
        <h2> Bets Received </h2>
        {
          betsReceived.map(bet => <BetCard bet={bet}/>)
        }
      </div>
    );
  }

}

function mapStateToProps({bets, user}) {
  return {
    bets,
    user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBets,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(menuWrapper(Bets));