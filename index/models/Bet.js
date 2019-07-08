const Sequelize = require('sequelize');
const sequelize = require('../db');

const Bet = sequelize.define('bet', {
  sportId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateOfEvent: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  teamOne: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  teamTwo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  betCreator: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  betCreatorLogin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  betCreatorHandicap: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  betReceiver: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  betReceiverLogin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  betReceiverHandicap: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  actualWinner: {
    type: Sequelize.STRING,
  },
  teamSelectedToWin: {
    type: Sequelize.STRING,
  },
  wager: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  archived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  hidden: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'bet',
});

module.exports = Bet;
