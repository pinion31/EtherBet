import redis from 'redis';
import User from '../models/User';
import Bet from '../models/Bet';
import Event from '../models/Event';
import Sport from '../models/Sport';

const client = redis.createClient();

const allTasks = [];
allTasks.push(User.destroy({ truncate: true, cascade: false }));
allTasks.push(Bet.destroy({ truncate: true, cascade: false }));
allTasks.push(Event.destroy({ truncate: true, cascade: false }));
allTasks.push(Sport.destroy({ truncate: true, cascade: false }));
allTasks.push(client.flushall());
client.quit();

Promise.all(allTasks)
  .then(() => console.log('DBs reset'))
  .catch((e) => console.log('Error resetting database', e));
