const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  login: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  addresses: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'user',
});

module.exports = User;
