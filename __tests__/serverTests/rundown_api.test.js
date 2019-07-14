import scheduledEvents from '../responses/NBA_events_2019_05_12_Scheduled';
import formattedEvents from '../responses/formattedEvents.json';
import { formatEvent } from '../../index/helpers/rundown_api';


const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it formats event from API call correctly', () => {
  const eventsFormatted = scheduledEvents.events.map(formatEvent);
  expect(eventsFormatted).toEqual(formattedEvents);
});
