import React, { Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { menuWrapper } from './functional/MenuBarWrapper.jsx';
import { setBetStatus } from '../actions/BetActions';

const BetCard = React.lazy(() => import('./functional/BetCard.jsx'));


class Bets extends React.Component {
  state = {
    betsCreated: [],
    betsReceived: [],
    betsOffered: [],
  }

  componentDidMount = () => {
    const { betsCreated, betsReceived, betsOffered } = this.sortBets(this.props.bets);
    this.setState({ betsCreated, betsReceived, betsOffered });
  };

  sortBets = (bets) => {
    const betsCreated = [];
    const betsReceived = [];
    const betsOffered = [];
    const { user: { id } } = this.props;

    bets.forEach((bet) => {
      if (bet.betCreator == id) return betsCreated.push(bet);
      if (bet.betReceiver == id && bet.status == 'OFFER PENDING') return betsOffered.push(bet);
      if (bet.betReceiver == id) return betsReceived.push(bet);
    });

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

    return (
      <div>
        <h2>Bets You Have Been Offered </h2>
        <Suspense fallback={<CircularProgress />}>
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
        </Suspense>
        <h2> Bets You Have Accepted </h2>
        <Suspense fallback={<CircularProgress />}>
          {
            betsReceived.map(bet => (
              <BetCard bet={bet} opponent={bet.betCreatorLogin} key={bet.id} type="ACCEPT" />
            ))
          }
        </Suspense>
        <h2> Bets You Have Created </h2>
        <Suspense fallback={<CircularProgress />}>
          {
            betsCreated.map(bet => (
              <BetCard bet={bet} key={bet.id} opponent={bet.betReceiverLogin} type="CREATOR" />
            ))
          }
        </Suspense>
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
    setBetStatus,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(menuWrapper(Bets));
