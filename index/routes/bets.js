const express = require('express');
const router = express.Router();
const Bet = require('../models/Bet');
const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//const $or = Op.or;
//const $eq = Op.eq;

router.post('/propose-bet', (req, res) => {
  const { 
    receiver,
    wager,
    teamSelectedToWin,
    senderId,
    eventDate,
    sportId,
    eventId,
    teamOne,
    teamTwo,
  } = req.body;

  User.findOne({ where: {login: receiver}})
    .then(receiverFound => {
      if (receiverFound) {
        Bet.create({
          sportId: Number.parseInt(sportId),
          eventId,
          teamSelectedToWin,
          dateOfEvent: eventDate,
          teamOne,
          teamTwo,
          status: 'OFFER PENDING',
          betCreator: Number.parseInt(senderId),
          betCreatorHandicap: 0,
          betReceiver: receiverFound.dataValues.id,
          betReceiverLogin: receiver,
          betReceiverHandicap: 0,
          actualWinner: '',
          wager: Number.parseFloat(wager),
        }).then(betResult => {
          if (betResult) {
            return res.status(200).send({status: '200'});
          } else {
            return res.status(200).send({error: 'Error creating Bet'});
          }
        });
      } else {
        return res.status(200).send({error: 'User not found'});
      }
    });
});

router.post('/get-bets', (req, res) => {
  const { userId } = req.body;
  const userIdInt = Number.parseInt(userId)
  Bet.findAll({where: {$or: [{'betCreator': { $eq: userIdInt}}, {'betReceiver': { $eq: userIdInt}}] }})
    .then(bets => {
      res.status(200).json(bets);
    });
});

module.exports = router;