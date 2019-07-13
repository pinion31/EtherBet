const express = require('express');
const Bet = require('../models/Bet');
const User = require('../models/User');

const router = express.Router();
router.post('/propose-bet', (req, res) => {
  const {
    receiver,
    wager,
    teamSelectedToWin,
    senderId,
    senderLogin,
    eventDate,
    sportId,
    eventId,
    teamOne,
    teamTwo,
  } = req.body;

  User.findOne({ where: { login: receiver } })
    .then((receiverFound) => {
      if (receiverFound) {
        Bet.create({
          sportId: Number.parseInt(sportId, 10),
          eventId,
          teamSelectedToWin,
          dateOfEvent: eventDate,
          teamOne,
          teamTwo,
          status: 'OFFER PENDING',
          betCreator: Number.parseInt(senderId, 10),
          betCreatorHandicap: 0,
          betCreatorLogin: senderLogin,
          betReceiver: receiverFound.dataValues.id,
          betReceiverLogin: receiver,
          betReceiverHandicap: 0,
          actualWinner: '',
          wager: Number.parseFloat(wager),
        }).then((betResult) => {
          if (betResult) {
            return res.status(200).json(betResult);
          }
          return res.status(200).send({ error: 'Error creating Bet' });
        });
      } else {
        return res.status(200).send({ error: 'User not found' });
      }
    });
});

router.post('/get-bets', (req, res) => {
  const { userId } = req.body;
  const userIdInt = Number.parseInt(userId, 10);
  Bet.findAll({
    where:
        { $or: [{ betCreator: { $eq: userIdInt } }, { betReceiver: { $eq: userIdInt } }] },
  }).then((bets) => {
    res.status(200).json(bets);
  });
});

router.post('/set-bet-status', (req, res) => {
  const { betId, newStatus } = req.body;
  const betIdInt = Number.parseInt(betId, 10);
  Bet.findOne({ where: { id: betIdInt } })
    .then((bet) => {
      bet.status = newStatus;
      bet.save();
      res.status(200).json({ status: newStatus });
    });
});

module.exports = router;
