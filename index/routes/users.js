const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/create-user', (req, res) => {
  const { username, password1, address } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) res.status(500).json({ error: err.message ? err.message : err });
    bcrypt.hash(password1, salt, (err1, hash) => {
      if (err1) res.status(500).json({ error: err1.message ? err1.message : err1 });
      console.log(username, password1, address);
      User.create({
        login: username, password: hash, addresses: [address], etherAmount: 0,
      })
        .then((user) => {
          res.status(200).json(user);
        });
    });
  });
});

router.post('/get-user', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ where: { login: username } })
    .then((user) => {
      if (!user) return res.status(200).json({ error: 'No User Found' });
      const hashedPassword = user.password;
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) throw Error('Error validating user.');
        console.log('res', result);
        if (result) return res.status(200).json(user);
        return res.status(200).json({ error: 'Invalid username/password' });
      });
    }).catch(({ message }) => res.status(200).json({ error: message }));
});


module.exports = router;
