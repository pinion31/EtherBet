const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/create-user', (req, res) => {
  const { username, password1, address } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) res.status(500).json({error: err.message ? err.message : err});
    bcrypt.hash(password1, salt, (err1, hash)  => {
      if (err1) res.status(500).json({error: err1.message ? err1.message : err1});
      User.create({login: username, password: hash, addresses: [address] })
      .then(user => {
        res.status(200).json(user);
      });
    });
  });
});

router.post('/get-user', (req, res) => {
  const { username, password } = req.body;
  User.findOne({id:18})
    .then(user => {
      console.log('user', user);
      res.status(200).json(user);
    });
});


module.exports = router;