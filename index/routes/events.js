import express from 'express';
import Event from '../models/Event';
import Sport from '../models/Sport';
import { getEventforDateforSport } from '../helpers/rundown_api';

const router = express.Router();

router.get('/get-sports', (req, res) => {
  Sport.findAll({})
    .then(result => res.status(200).json(result))
    .catch(() => res.status(200).send({ error: 'Error Receiving Sports' }));
});

router.get('event-from-service-by-sport-by-date', (req, res) => {
  const { date } = req.body;
  res.end();
});

router.get('event-day', (req, res) => {
  const { date } = req.body;
  res.end();
});
module.exports = router;
