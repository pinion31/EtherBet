import request from 'request-promise-native';
import clone from 'clone';
import scheduledEvents from '../responses/NBA_events_2019_05_12_Scheduled';
import formattedEvents from '../responses/formattedEvents.json';
import { formatEvent, getEventforDateforSport } from '../../index/helpers/rundown_api';

jest.mock('request');

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it formats event from API call correctly', () => {
  const eventsFormatted = scheduledEvents.events.map(formatEvent);
  expect(eventsFormatted).toEqual(formattedEvents);
});

test('it calls Rundown API for event information', async () => {
  request.mockResolvedValue(scheduledEvents);
  const eventsToCompare = clone(scheduledEvents);
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
