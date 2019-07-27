import express from 'express';
import moment from 'moment';
import Event from '../models/Event';
import Sport from '../models/Sport';
import { pullEventAndSave, getEventsforFutureDays, getSportsFromDB } from '../helpers/rundown_api';

const router = express.Router();

router.get('/get-sports', (req, res) => {
  getSportsFromDB()
    .then(result => res.status(200).json(result))
    .catch(() => res.status(200).send({ error: 'Error Receiving Sports' }));
});

router.get('/event-from-service-by-sport-by-date', (req, res) => {
  const { date } = req.body;
  res.end();
});

// retrieve all events from present-day onward
// will need to send events after today for future betting
router.get('/events-for-today', (req, res) => {
  Event.findAll({ where: { eventDate: { $gt: moment().startOf('day').toDate() } } })
    .then(events => res.status(200).json(events));
});

// temporary for testing
router.post('/event-day', (req, res) => {
  const { date, sportId } = req.body;
  pullEventAndSave(date, sportId)
    .then(events => res.status(200).json(events));
});

// temporary for testing
router.post('/get-all-events-for-day', (req, res) => {
  const { numOfDays } = req.body;
  getEventsforFutureDays(numOfDays)
    .then(events => res.status(200).json(events));
});

module.exports = router;
