import moment from 'moment';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Event from '../models/Event';
import Sport from '../models/Sport';

import events from '../../__tests__/responses/eventsForE2E.json';
import sports from '../../__tests__/responses/sportsFromDb.json';

const generatePassword = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) reject(err);
    bcrypt.hash(password, salt, (err1, hash) => {
      if (err1) reject(err);
      resolve(hash);
    });
  });
});



(async () => {
  await Promise.all(events.map((event) => {
    // eslint-disable-next-line no-param-reassign
    event.eventDate = moment(new Date(Date.now())).add(4, 'hours');
    return Event.create(event);
  }));
  const userPassword = await generatePassword('c');
  const userPassword2 = await generatePassword('c');

  const testUser = {
    id: 100,
    login: 'Nicole',
    password: userPassword,
    addresses: ['testAddress', 'addressOne'],
    etherAmount: 1000,
    createdAt: '2019-07-21 16:16:26.322-05',
    updatedAt: '2019-07-21 16:16:26.322-05',
  };

  const testUser2 = {
    id: 101,
    login: 'Lucy',
    password: userPassword2,
    addresses: ['testAddress', 'addressOne'],
    etherAmount: 1000,
    createdAt: '2019-07-21 16:16:26.322-05',
    updatedAt: '2019-07-21 16:16:26.322-05',
  };

  await User.create(testUser);
  await User.create(testUser2);
  await Promise.all(sports.map(sport => Sport.create(sport)));
})();