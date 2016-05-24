'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const app = express();

console.log(ObjectID);

MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
  if (err) {
    console.log('Error connecting to MongoDB:', err.message);
  } else {
    console.log('Succesfully connected to MongoDB');
    db.close();
  }
});

app.get('/', (req, res) => {
  let date = new Date();
  res.status(200).json({ timestamp: date.toISOString() });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
