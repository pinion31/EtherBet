const express = require('express');
const router = express.Router();

router.get('create-bet', (req, res) => {
  const { date } = req.body;
  res.end();
})

router.get('retrieve-bets', (req, res) => {
  const { date } = req.body;
  res.end();
})