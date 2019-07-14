const Sequelize = require('sequelize');
const sequelize = require('../db');

const Sport = sequelize.define('sport', {
  sportId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sportName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  lastQueryDate: {
    type: Sequelize.DATE,
  },
});

module.exports = Sport;
