import express from 'express';
import Event from '../models/Event';
import Sport from '../models/Sport';
import { pullEventAndSave, getSportsFromDB } from '../helpers/rundown_api';

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

router.post('/event-day', (req, res) => {
  const { date, sportId } = req.body;
  pullEventAndSave(date, sportId)
    .then((events) => {
      console.log('done');
      res.status(200).json(events);
    });
});

module.exports = router;
