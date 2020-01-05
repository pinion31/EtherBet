const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const logger = require('../logger');

router.post('/create-user', (req, res) => {
  const { username, password1, address } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) res.status(500).json({ error: err.message ? err.message : err });
    bcrypt.hash(password1, salt, (err1, hash) => {
      if (err1) {
        logger.info(`Error: ${JSON.stringify(err1)}`);
        return res.status(500).json({ error: err1.message ? err1.message : err1 });
      }
      User.create({
        login: username, password: hash, addresses: [address], etherAmount: 0,
      })
        .then((user) => {
          logger.info(`Created User: ${JSON.stringify(user)}`);
          res.status(200).json(user);
        });
    });
  });
});

router.post('/get-user', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ raw: true, where: { login: username } })
    .then((user) => {
      if (!user) {
        logger.info(`Invalid username/password: ${username}`);
        return res.status(200).json({ error: 'Invalid username/password' });
      }
      const hashedPassword = user.password;
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) throw Error('Error validating user.');
        logger.info(`Login result: ${JSON.stringify(result)}`);
        const filteredUser = { ...user, password: null };
        if (result) return res.status(200).json(filteredUser);
        logger.info(`Invalid username/password: ${JSON.stringify(result)}`);
        return res.status(200).json({ error: 'Invalid username/password' });
      });
    }).catch(({ message }) => {
      logger.info(`Error in /get-user: ${JSON.stringify(message)}`);
      return res.status(200).json({ error: message });
    });
});


module.exports = router;
