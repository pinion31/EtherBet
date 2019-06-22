import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { menuWrapper } from './functional/MenuBarWrapper';
import { getBets } from '../actions/BetActions';
import BetCard from './functional/BetCard';

class Bets extends React.Component {
  state = {
    betsCreated: [],
    betsReceived: [],
  }

  componentDidMount = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getBets(this.props.user.id, (bets) => {
      const { betsCreated, betsReceived } = this.sortBets(bets);
      this.setState({ betsCreated, betsReceived });
    });
  };

  sortBets = (bets) => {
    const betsCreated = [];
    const betsReceived = [];
    const { user: { id } } = this.props;

    bets.forEach((bet) => {
      if (bet.betCreator == id) betsCreated.push(bet);
      if (bet.betReceiver == id) betsReceived.push(bet);
    });
    console.log('betsCreated', betsCreated);
    return { betsCreated, betsReceived };
  };

  render() {
    const { betsReceived, betsCreated } = this.state;
    console.log('betsCreated state', betsCreated);
    return (
      <div>
        <h2> Bets Created </h2>
        {
          betsCreated.map(bet => <BetCard bet={bet} key={bet.id} />)
        }
        <h2> Bets Received </h2>
        {
          betsReceived.map(bet => <BetCard bet={bet} key={bet.id} />)
        }
      </div>
    );
  }
}

function mapStateToProps({ bets, user }) {
  return {
    bets,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBets,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(menuWrapper(Bets));
