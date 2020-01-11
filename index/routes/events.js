import express from 'express';
import moment from 'moment';
import Event from '../models/Event';
import { client } from '../helpers/redisClient';
import { pullEventAndSave, getEventsforFutureDays, getSportsFromDB } from '../helpers/rundown_api';

const logger = require('../logger');

const router = express.Router();

router.get('/get-sports', (req, res) => {
  client.get('sports', (err, cachedSports) => {
    if (err || !cachedSports) { // sports not cached then retrievd from dv
      return getSportsFromDB()
        .then((result) => {
          logger.info(`Retrieving Sports from DB and setting cache: ${result}`);
          client.set('sports', JSON.stringify(result));
          return res.status(200).json(result);
        }).catch(() => res.status(200).send({ error: 'Error Receiving Sports' }));
    }
    logger.info(`Retrieving Sports from Redis cache: ${cachedSports}`);
    return res.status(200).json(JSON.parse(cachedSports));
  });
});

// router.get('/event-from-service-by-sport-by-date', (req, res) => {
//   const { date } = req.body;
//   res.end();
// });

// retrieve all events from present-day onward
// will need to send events after today for future betting
router.get('/events-for-today', (req, res) => {
  Event.findAll({ where: { eventDate: { $gt: moment().startOf('day').toDate() } } })
    .then(events => res.status(200).json(events));
});

router.post('/events-for-day', (req, res) => {
  const { eventDate } = req.body;
  Event.findAll({ where: { eventDate: { $gt: moment(eventDate).startOf('day').subtract(1, 'days').toDate(), $lt: moment(eventDate).endOf('day').toDate() } } })
    .then(events => res.status(200).json(events));
});

router.get('/events-for-subsequent-days', (req, res) => {
  Event.findAll({ where: { eventDate: { $gt: moment(new Date(Date.now())).startOf('day').toDate() } } })
    .then(events => res.status(200).json(events));
});

// // temporary for testing
// router.post('/event-day', (req, res) => {
//   const { date, sportId } = req.body;
//   pullEventAndSave(date, sportId)
//     .then(events => res.status(200).json(events));
// });

// // temporary for testing
// router.post('/get-all-events-for-day', (req, res) => {
//   const { numOfDays } = req.body;
//   getEventsforFutureDays(numOfDays)
//     .then(events => res.status(200).json(events));
// });

module.exports = router;
