import redis from 'redis';
import User from '../models/User';
import Bet from '../models/Bet';
import Event from '../models/Event';
import Sport from '../models/Sport';

const client = redis.createClient();

User.destroy({ truncate: true, cascade: false });
Bet.destroy({ truncate: true, cascade: false });
Event.destroy({ truncate: true, cascade: false });
Sport.destroy({ truncate: true, cascade: false });

client.flushall('ASYNC', () => console.log('Redis flushed'));
client.quit();
