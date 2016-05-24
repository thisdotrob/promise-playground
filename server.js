'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  let date = new Date();
  res.status(200).json({ timestamp: date.toISOString() });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
