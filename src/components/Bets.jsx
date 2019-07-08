import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import { getBets, setBetStatus } from '../actions/BetActions';
import BetCard from './functional/BetCard.jsx';

class Bets extends React.Component {
  state = {
    betsCreated: [],
    betsReceived: [],
    betsOffered: [],
  }

  componentDidMount = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getBets(this.props.user.id, (bets) => {
      console.log('bets', bets);
      const { betsCreated, betsReceived, betsOffered } = this.sortBets(bets);
      this.setState({ betsCreated, betsReceived, betsOffered });
    });
  };

  sortBets = (bets) => {
    const betsCreated = [];
    const betsReceived = [];
    const betsOffered = [];
    const { user: { id } } = this.props;

    bets.forEach((bet) => {
      if (bet.betCreator == id) betsCreated.push(bet);
      if (bet.betReceiver == id && bet.status == 'OFFER PENDING') return betsOffered.push(bet);
      if (bet.betReceiver == id) return betsReceived.push(bet);
    });
    console.log('betsCreated', betsCreated);
    return { betsCreated, betsReceived, betsOffered };
  };

  acceptBet = (index, updatedStatus) => {
    const { betsOffered, betsReceived } = this.state;
    const updatedOfferedBets = [...betsOffered.slice(0, index), ...betsOffered.slice(index + 1)];
    const updatedBet = betsOffered[index];

    this.props.setBetStatus(updatedStatus, updatedBet.id, ({ status }) => {
      updatedBet.status = status;

      const updatedReceivedBets = [...betsReceived, updatedBet];
      this.setState({
        betsOffered: updatedOfferedBets,
        betsReceived: updatedReceivedBets,
      });
    });
  };

  render() {
    const { betsReceived, betsCreated, betsOffered } = this.state;
    console.log('betsCreated state', betsCreated);
    return (
      <div>
        <h2>Bets You Have Been Offered </h2>
        {
          betsOffered.map((bet, index) => (
            <BetCard
              bet={bet}
              key={bet.id}
              type="OFFER"
              index={index}
              acceptBet={this.acceptBet}
              opponent={bet.betCreatorLogin}
            />
          ))
        }
        <h2> Bets You Have Accepted </h2>
        {
          betsReceived.map(bet => <BetCard bet={bet} opponent={bet.betCreatorLogin} key={bet.id} type="ACCEPT" />)
        }
        <h2> Bets You Have Created </h2>
        {
          betsCreated.map(bet => <BetCard bet={bet} key={bet.id} opponent={bet.betReceiverLogin} type="CREATOR" />)
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
    setBetStatus,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(menuWrapper(Bets));
