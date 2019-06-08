const sequelize = require('../db');
const Sequelize = require('sequelize');

const Event = sequelize.define('event', {
    sportId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    eventId: {
      type: Sequelize.STRING,
      allowNull:false
    },
    eventDate: {
        type: Sequelize.DATE,
        allowNull:false
    },
    eventStatus: {
        type: Sequelize.STRING,
        allowNull:false
    },
    scoreAway: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    scoreHome: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    winnerAway: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    winnerHome: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    venueName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    venueLocation: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    teamOneId: {
        type: Sequelize.INTEGER,
    },
    teamOneName: {
        type: Sequelize.STRING,
    },
    teamOneIsAway: {
        type: Sequelize.BOOLEAN,
        allowNull:false
    },
    teamOneIsHome: {
        type: Sequelize.BOOLEAN,
        allowNull:false
    },
    teamOneHandicap: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    teamTwoId: {
        type: Sequelize.INTEGER,
    },
    teamTwoName: {
        type: Sequelize.STRING,
    },
    teamTwoIsAway: {
        type: Sequelize.BOOLEAN,
        allowNull:false
    },
    teamTwoIsHome: {
        type: Sequelize.BOOLEAN,
        allowNull:false
    },
    teamTwoHandicap: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    betCount: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
  }, {
    // options
  });

  module.exports = Event;
