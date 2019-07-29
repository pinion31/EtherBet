import { pullWinningTeam, getFinishedEvents } from '../../index/helpers/betHelper';
import finishedEvent from '../responses/finishedEvent.json';
import getFinishedEventsResults from '../responses/getFinishedEventsResults.json';
import events from '../responses/events.json';
import User from '../../index/models/User.js';
import Event from '../../index/models/Event';
import Bet from '../../index/models/Bet';

Date.now = jest.fn(() => new Date(Date.UTC(2019, 6, 22, 4)).valueOf());

beforeEach((done) => {
  User.destroy({ truncate: true, cascade: false })
    .then(() => Event.destroy({ truncate: true, cascade: false }))
    .then(() => Bet.destroy({ truncate: true, cascade: false }))
    .then(() => Promise.all(events.map(event => Event.create(event))))
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
  expect(formattedEvents).toEqual(getFinishedEventsResults);
});