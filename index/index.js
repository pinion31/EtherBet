const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const bodyParser = require('body-parser');
const events = require('./routes/events');
const bets = require('./routes/bets');
const users = require('./routes/users');
const logger = require('./logger');
const { startCronJob } = require('./helpers/cron');

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/events', events);
app.use('/bets', bets);
app.use('/users', users);

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3000, () => {
    logger.info(`Starting app at ${new Date(Date.now())}`);
    if (process.env.NODE_ENV === 'production') startCronJob();
    console.log('App started for your convenience.');
  });
}

module.exports = app;
