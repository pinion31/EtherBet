const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/create-user', (req, res) => {
  const { username, password1, address } = req.body;
  User.create({login: username, password: password1, addresses: [address] })
    .then(user => {
      console.log('user inserted');
      res.json(user);
    });
  //console.log('req.body', req.body);
  //res.end();
});

module.exports = router;