

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));


app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App started for your convenience');
});

module.exports = app;
