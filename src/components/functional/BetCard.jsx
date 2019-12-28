import React, { Fragment } from 'react';
import MomentLocaleUtils, {
  formatDate,
} from 'react-day-picker/moment';
import { betCard } from '../css/BetCard.css';

const BetCard = ({
  bet, type, acceptBet, index, opponent,
}) => (
  <>
    <div className={betCard}>
      <h3>{`Date of Event: ${formatDate(bet.dateOfEvent)}`}</h3>
      <h1>{`${bet.teamOne} vs ${bet.teamTwo}`}</h1>
      <h3>{`Wager: ${bet.wager} eth`}</h3>
      <h3>{`Betting Against: ${opponent}`}</h3>
      <h3>{`Bet: ${bet.teamSelectedToWin} to win by 10pts`}</h3>
      <h3>{`Status: ${bet.status}`}</h3>
      {
        type === 'OFFER' && (
        <>
          <button type="submit" className="smButton" onClick={() => acceptBet(index, 'ACCEPTED')}>
        Accept Bet
          </button>
          <button type="submit" className="smButton" onClick={() => acceptBet(index, 'REJECTED')}>
        Reject Bet
          </button>
        </>
        )
      }
      <h3>Odds</h3>
    </div>
  </>
);

export default BetCard;
