/* eslint-disable no-param-reassign */

import request from 'request-promise-native';
import clone from 'clone';
import scheduledEvents from '../responses/NBA_events_2019_05_12_Scheduled';
import futureEvents from '../responses/eventsEternallyInFuture';
import formattedEvents from '../responses/formattedEvents.json';
import eventsForSport4 from '../responses/getEventsForForFutureDaysTestResults.json';
import preloadedEventForTest from '../responses/preloadedEvent.json';
import Event from '../../index/models/Event';
import Sport from '../../index/models/Sport';
import {
  formatEvent, getEventforDateforSport, getEventsforFutureDays, updateSportQueryDate,
} from '../../index/helpers/rundown_api';

jest.mock('request');

Date.now = jest.fn(() => new Date(Date.UTC(2019, 6, 22, 4)).valueOf());

beforeEach((done) => {
  Event.destroy({ truncate: true, cascade: false })
    .then(() => Promise.all(preloadedEventForTest.map(event => Event.create(event))))
    .then(() => done());
});

test('it formats event from API call correctly', () => {
  const eventsFormatted = scheduledEvents.events.map(formatEvent);
  expect(eventsFormatted).toEqual(formattedEvents);
});

test('it calls Rundown API for event information', async () => {
  request.mockResolvedValue(scheduledEvents);
  const { events: eventsToCompare } = clone(scheduledEvents);
  const eventsFormatted = await getEventforDateforSport('2019-05-12', 4);

  const options = {
    uri: 'https://therundown-therundown-v1.p.rapidapi.com/sports/4/events/2019-05-12?include=scores',
    headers: {
      'User-Agent': 'Request-Promise',
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': 'therundown-therundown-v1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    },
    json: true, // Automatically parses the JSON string in the response
  };
  expect(request).toHaveBeenCalledTimes(1);
  expect(request).toHaveBeenCalledWith(options);
  expect(eventsFormatted).toEqual(eventsToCompare);
});

test('it should pulls for the next date', async () => {
  request.mockImplementation(({ uri }) => {
    const id = uri.split('/sports/')[1].slice(0, 1);
    if (['4', '9'].includes(id)) return Promise.resolve(futureEvents);
    return Promise.resolve({ events: [] });
  });

  await getEventsforFutureDays(1);
  const events = await Event.findAll({ raw: true });
  expect(request).toHaveBeenCalledTimes(7);
  const resultsToCompare = Array.from(eventsForSport4);
  resultsToCompare.forEach((event, key) => {
    event.createdAt = events[key].createdAt;
    event.updatedAt = events[key].updatedAt;
    event.id = events[key].id;
    event.eventDate = events[key].eventDate;
  });
  expect(events).toEqual(eventsForSport4);
});

test('it should update last sport query date for an event', async (done) => {
  await updateSportQueryDate(1);
  Sport.findOne({ raw: true, where: { id: 1 } })
    .then(({ lastQueryDate }) => {
      expect(lastQueryDate.toString()).toBe('Sun Jul 21 2019 23:00:00 GMT-0500 (Central Daylight Time)');
      done();
    });
});

test('it should update nothing if it cannnot find a previous id for sports query update', async (done) => {
  const error = await updateSportQueryDate(10);
  expect(error).toBe('Sport does not exist');
  done();
});
