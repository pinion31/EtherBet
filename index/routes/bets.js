const express = require('express');
const router = express.Router();
const Bet = require('../models/Bet');

/*
    sportId: 
    eventId: 
    dateOfEvent
    teamOne: 
    teamTwo: 
    status: 
    betCreator: 
    betCreatorHandicap: 
    betReceiver:
    betReceiverHandicap: 
    winner
    wager:
*/
/*
      receiver: receiverLogin,
      wager,
      teamSelectedToWin,
      senderId,
      eventDate: event_date,
      sportId: sport_id,
      eventId: event_id,
*/
router.post('/propose-bet', (req, res) => {
  const { receiver, wager, teamSelectedToWin, senderId, eventDate, sportId, eventId, teamOne, teamTwo } = req.body;
  Bet.create({
    sportId: Number.parseInt(sportId),
    eventId,
    dateOfEvent: eventDate,
    teamOne,
    teamTwo,
    status: 'OFFER PENDING',
    betCreator: 45,
    betCreatorHandicap: 0,
    betReceiver: 12,
    betReceiverHandicap: 0,
    winner: '',
    wager: Number.parseFloat(wager),
  }).then(result => {
    console.log('saved');
  });
  console.log('req.body', req.body);
  res.end();
})

router.get('/retrieve-bets', (req, res) => {
  const { date } = req.body;
  res.end();
})

module.exports = router;