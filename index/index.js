const express = require('express');
const session = require('express-session');
const path = require('path');
// const redis = require('redis');
// const RedisStore = require('connect-redis')(session);

// const client = redis.createClient();
const app = express();
const bodyParser = require('body-parser');
const events = require('./routes/events');
const bets = require('./routes/bets');
const users = require('./routes/users');
const logger = require('./logger');
const { startCronJob } = require('./helpers/cron');

app.use(bodyParser.json());
app.use(session({
  secret: 'test',
  // store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
  saveUninitialized: true,
  resave: true,
}));

app.use(express.static(path.join(__dirname, '../dist')));
// app.use('*', (req, res, next) => {
//   console.log('res.session', req.session);
//   console.log('cookie check');
//   next();
// });

app.use('/events', events);
app.use('/bets', bets);
app.use('/users', users);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// if (process.env.NODE_ENV !== 'test') {
app.listen(process.env.PORT || 3000, () => {
  logger.info(`Starting app at ${new Date(Date.now())}`);
  if (process.env.NODE_ENV === 'production') startCronJob();
  console.log('App started for your convenience');
});
// }


module.exports = app;
