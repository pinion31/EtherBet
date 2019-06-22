const sequelize = require('../db');
const Sequelize = require('sequelize');

const Bet = sequelize.define('bet', {
    sportId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    eventId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateOfEvent: {
        type: Sequelize.DATE,
        allowNull: false
    },
    teamOne: {
        type: Sequelize.STRING,
        allowNull: false
    },
    teamTwo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    betCreator: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    betCreatorHandicap: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    betReceiver: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    betReceiverHandicap: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    winner: {
        type: Sequelize.STRING,
    },
    wager: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}, {
        sequelize, 
        modelName: 'bet'
    });

module.exports = Bet;

