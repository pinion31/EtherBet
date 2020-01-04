import moment from 'moment';
import User from '../models/User';
import Event from '../models/Event';
import Bet from '../models/Bet';
import logger from '../logger';

// find all of events for last 6 days that have completed
export const getFinishedEvents = () => Event.findAll({
  raw: true,
  where: {
    eventStatus: 'STATUS_FINAL',
    eventDate: { $gt: moment().startOf('day').subtract(5, 'days').toDate(), $lt: moment().endOf('day').toDate() },
  },
}).then((events) => {
  const objectWithEvents = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const event of events) {
    objectWithEvents[event.eventId] = event;
  }
  logger.info(`Getting Finished Events:${JSON.stringify(objectWithEvents)}`);
  return objectWithEvents;
});

export const pullWinningTeam = (event) => {
  const { winnerHome, teamTwoName, teamOneName } = event;
  logger.info(`Pulling Winning Team for Game between ${teamOneName} and ${teamTwoName}`);
  const winnerKey = parseInt(winnerHome, 10) ? 'IsHome' : 'IsAway';
  return (event[`teamOne${winnerKey}`] && teamOneName)
  || (event[`teamTwo${winnerKey}`] && teamTwoName);
};

export const payBettor = (id, amount) => User.findOne({ where: { id } })
  .then((user) => {
    if (user) {
      const newAmount = user.etherAmount + amount;
      // eslint-disable-next-line no-param-reassign
      user.etherAmount = newAmount;
      logger.info(`Paying ${amount} to ${user.login}. New Amount is ${newAmount}`);
      return user.save();
    }
    throw Error('Payee not found.');
  }).catch(e => e);

export const settleBet = (bet, winner) => {
  const { betCreator, betReceiver, wager } = bet;
  logger.info(`Settling Bet: ${JSON.stringify(bet)}`);
  if (winner === bet.teamSelectedToWin) return payBettor(betCreator, wager);
  return payBettor(betReceiver, wager);
};

export const settleAllBets = async () => {
  const finishedEvents = await getFinishedEvents();
  return Bet.findAll({ raw: true, where: { status: 'ACCEPTED' } })
    .then(unsettledBets => Promise.all(unsettledBets.map((bet) => {
      if (!finishedEvents[bet.eventId]) return Promise.resolve([]);
      const winner = pullWinningTeam(finishedEvents[bet.eventId]);
      logger.info(`Winner is ${winner} for Bet: ${bet.eventId}`);
      return settleBet(bet, winner);
    })));
};

export const deletePreviousEvents = () => Event.findAll({
  where: {
    eventStatus: 'STATUS_FINAL',
    eventDate: { $lt: moment().startOf('day').toDate() },
  },
}).then((events) => {
  const allDeletedEvents = [];
  if (events) {
    // functional opportunity to replace function with push function, maybe?
    logger.info(`Deleting Events: ${JSON.stringify(events)}`);
    events.forEach(event => allDeletedEvents.push(event.destroy()));
  }
  return Promise.all(allDeletedEvents);
});
