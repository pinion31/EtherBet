import moment from 'moment';
import User from '../models/User';
import Bet from '../models/Bet';
import Event from '../models/Event';
import Sport from '../models/Sport';

import events from '../../__tests__/responses/events.json';
import sports from '../../__tests__/responses/sportsFromDb.json';

(async () => {
  await Promise.all(events.map((event) => {
    // eslint-disable-next-line no-param-reassign
    event.eventDate = moment(new Date(Date.now())).add(4, 'hours');
    return Event.create(event);
  }));

  const testUser = {
    id: 100,
    login: 'Nicole',
    password: '$2a$10$zT.RBNpLAk48g2LhR48QOePH.1q3UCEZMv.7S7u28y3BG0Q.pNmKG',
    addresses: ['testAddress', 'addressOne'],
    etherAmount: 1000,
    createdAt: '2019-07-21 16:16:26.322-05',
    updatedAt: '2019-07-21 16:16:26.322-05',
  };

  await User.create(testUser);
  await Promise.all(sports.map(sport => Sport.create(sport)));
})();