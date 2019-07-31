import moment from 'moment';
import User from '../models/User';
import Event from '../models/Event';
import Bet from '../models/Bet';

// find all of events for last 2 days that have completed
export const getFinishedEvents = () => Event.findAll({
  raw: true,
  where: {
    eventStatus: 'STATUS_FINAL',
    eventDate: { $gt: moment().startOf('day').subtract(1, 'days').toDate(), $lt: moment().endOf('day').toDate() },
  },
}).then((events) => {
  const objectWithEvents = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const event of events) {
    objectWithEvents[event.eventId] = event;
  }
  return objectWithEvents;
});

export const pullWinningTeam = (event) => {
  const { winnerHome, teamTwoName, teamOneName } = event;
  const winnerKey = winnerHome ? 'IsHome' : 'IsAway';
  return (event[`teamOne${winnerKey}`] && teamOneName)
  || (event[`teamTwo${winnerKey}`] && teamTwoName);
};

export const payBettor = (id, amount) => User.findOne({ where: { id } })
  .then((user) => {
    if (user) {
      const newAmount = user.etherAmount + amount;
      // eslint-disable-next-line no-param-reassign
      user.etherAmount = newAmount;
      return user.save();
    }
    throw Error('Error paying out bet.');
  });

export const settleBet = (bet, winner) => {
  const { betCreator, betReceiver, wager } = bet;
  if (winner === bet.teamSelectedToWin) return payBettor(betCreator, wager);
  return payBettor(betReceiver, wager);
};

export const settleAllBets = async () => {
  const finishedEvents = await getFinishedEvents();
  return Bet.findAll({ raw: true, where: { status: 'ACCEPTED' } })
    .then(unsettledBets => Promise.all(unsettledBets.map((bet) => {
      const winner = pullWinningTeam(finishedEvents[bet.eventId]);
      return settleBet(bet, winner);
    })));
};
