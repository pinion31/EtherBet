const sequelize = require('../db');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull:false
    },
    login: {
        type: Sequelize.STRING,
        allowNull:false
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false
    }
  }, {
    // options
  });

  module.exports = User;
