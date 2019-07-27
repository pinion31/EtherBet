import moment from 'moment';
import User from '../models/User';
import Event from '../models/Events';
import Bet from '../models/Bets';

// find all of events for last 2 days that have completed
export const getFinishedEvents = () => Event.findAll({
  raw: true,
  where: {
    eventStatus: 'STATUS_FINAL',
    eventDate: { $gt: moment().startOf('day').subtract(1, 'days').toDate(), $lt: moment().endOf('day').toDate() },
  },
}).then(events => {
  const objectWithEvents = {};
  for (let event of events) {
    objectWithEvents[event.eventId] = event;
  }
  return objectWithEvents;
});

export const pullWinningTeam = bet => {
  const { winnerHome } = bet;
  const winnerKey = winnerHome ? 'IsHome' : 'IsAway';
  return (bet[`teamOne${winnerKey}`] && teamOneName) ||
  (bet[`teamTwo${winnerKey}`/] && teamTwoName);
};

export const settleAllBets = async () => {
  const finishedEvents = await getFinishedEvents;
  Bet.findAll({ raw: true, where: { status: 'ACCEPTED' } })
    .then((unsettledBets) => {
      unsettledBets.forEach((bet) => {
        const winner = pullWinningTeam(finishedEvents[bet.eventId]);
        settleBet(bet, winner);
      });
    });
};

export const payBettor = (id, amount) => {
  User.findOne({ where: { id } })
    .then((user) => {
      if (user) {
        const newAmount = user.etherAmount + amount;
        user.etherAmount = newAmount;
        return user.save();
      }
      throw Error('Error paying out bet.');
    });
};

export const settleBet = (bet, winner) => {
  if (winner == bet.teamSelectedToWin) return payBettor(betCreator, wager);
  return payBettor(betReceiver, wager);
};


