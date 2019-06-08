const express = require('express');
const router = express.Router();
const Event = '../models/Event';

router.get('event-day', (req, res) => {
  const { date } = req.body;
  res.end();
})