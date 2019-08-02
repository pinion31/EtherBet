import {
  pullWinningTeam, getFinishedEvents, payBettor, settleBet, settleAllBets,
} from '../../index/helpers/betHelper';
import finishedEvent from '../responses/finishedEvent.json';
import getFinishedEventsResults from '../responses/getFinishedEventsResults.json';
import events from '../responses/events.json';
import users from '../responses/users.json';
import sampleBets from '../responses/moreSampleBets.json';
import betsToSettle from '../responses/betsToSettle.json';
import User from '../../index/models/User';
import Event from '../../index/models/Event';
import Bet from '../../index/models/Bet';

Date.now = jest.fn(() => new Date(Date.UTC(2019, 6, 22, 4)).valueOf());

beforeEach((done) => {
  User.destroy({ truncate: true, cascade: false })
    .then(() => Event.destroy({ truncate: true, cascade: false }))
    .then(() => Bet.destroy({ truncate: true, cascade: false }))
    .then(() => Promise.all(events.map(event => Event.create(event))))
    .then(() => Promise.all(users.map(user => User.create(user))))
    .then(() => Promise.all(betsToSettle.map(bet => Bet.create(bet))))
    .then(() => done());
});

test('it should determine winner from event', () => {
  const winner = pullWinningTeam(finishedEvent);
  expect(winner).toBe('Phoenix Mercury');
});

test('it should pull all finished events ', async () => {
  const formattedEvents = await getFinishedEvents();
  formattedEvents.f755b616f644d34f098dcb17050292c5.updatedAt = '2019-07-21 16:22:00.007Z';
  formattedEvents.f755b616f644d34f098dcb17050292c5.createdAt = '2019-07-21 16:22:00.007Z';
  formattedEvents.f755b616f644d34f098dcb17050292c5.eventDate = '2019-07-21T19:00:00.000Z';
  formattedEvents['9df8c15b7ab4db75c54de09ac5ffdaf1'].updatedAt = '2019-07-21 16:21:59.95Z';
  formattedEvents['9df8c15b7ab4db75c54de09ac5ffdaf1'].createdAt = '2019-07-21 16:21:59.95Z';
  formattedEvents['9df8c15b7ab4db75c54de09ac5ffdaf1'].eventDate = '2019-07-21T00:00:00.000Z';
  formattedEvents['8bf50b3232109840ea6fba31c4af7cdc'].updatedAt = '2019-07-21 16:22:00.272Z';
  formattedEvents['8bf50b3232109840ea6fba31c4af7cdc'].createdAt = '2019-07-21 16:22:00.272Z';
  formattedEvents['8bf50b3232109840ea6fba31c4af7cdc'].eventDate = '2019-07-21T17:10:00.000Z';
  formattedEvents['5c25642185ec4bd28e56e3e975e65c71'].updatedAt = '2019-07-31T02:08:54.422Z';
  formattedEvents['5c25642185ec4bd28e56e3e975e65c71'].createdAt = '2019-07-21T21:21:59.950Z';
  formattedEvents['5c25642185ec4bd28e56e3e975e65c71'].eventDate = '2019-07-21T19:30:00.000Z';
  formattedEvents['8b58dab379fb4719c79c229cb8314d99'].updatedAt = '2019-07-31T02:08:54.422Z';
  formattedEvents['8b58dab379fb4719c79c229cb8314d99'].createdAt = '2019-07-21T21:21:59.950Z';
  formattedEvents['8b58dab379fb4719c79c229cb8314d99'].eventDate = '2019-07-21T23:00:00.000Z';
  expect(formattedEvents).toEqual(getFinishedEventsResults);
});

test('it should pay a bettor 1000 eth', async (done) => {
  await payBettor(1, 1000);
  User.findOne({ raw: true, where: { id: 1 } })
    .then(({ etherAmount }) => {
      expect(etherAmount).toBe(2000);
      done();
    });
});

test('it should throw error for invalid user', async (done) => {
  const { message } = await payBettor(3, 1000);
  expect(message).toBe('Payee not found.');
  done();
});

test('it should settle bet', (done) => {
  const [, bet] = sampleBets;
  settleBet(bet, 'Toronto Raptors')
    .then(() => User.findOne({ raw: true, where: { id: 2 } }))
    .then(({ etherAmount }) => {
      expect(etherAmount).toBe(1050);
      done();
    });
});

test('it should settle and payout all bets', async (done) => {
  await settleAllBets();
  User.findAll({ raw: true })
    .then((usersInDB) => {
      const [chris, lucy] = usersInDB;
      expect(lucy.etherAmount).toBe(1300);
      expect(chris.etherAmount).toBe(1010);
      done();
    });
});
