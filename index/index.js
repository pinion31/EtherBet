

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const events = require('./routes/events');
const bets = require('./routes/bets');


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/events', events);
app.use('/bets', bets);

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App started for your convenience');
});

module.exports = app;
