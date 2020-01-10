const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const logger = require('../logger');
const { generateTokens, deleteToken } = require('../helpers/authHelper');

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
        const { accessToken, refreshToken } = generateTokens(filteredUser.id);

        // Set browser httpOnly cookies
        res.cookie('access_token', accessToken, {
          httpOnly: true,
        });

        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
        });

        if (result) return res.status(200).json(filteredUser);
        logger.info(`Invalid username/password: ${JSON.stringify(result)}`);
        return res.status(200).json({ error: 'Invalid username/password' });
      });
    }).catch(({ message }) => {
      logger.info(`Error in /get-user: ${JSON.stringify(message)}`);
      return res.status(200).json({ error: message });
    });
});

router.post('/logout', (req, res) => {
  const { id } = req.body;
  logger.info(`User ${id} logged out at ${new Date(Date.now())}`);
  deleteToken(id);
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.status(200).json({ status: 'Logged Out' });
});

module.exports = router;
