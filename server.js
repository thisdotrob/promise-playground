'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const app = express();

MongoClient.connect('mongodb://localhost:27017/books', (err, db) => {
  if (err) throw Error(err);
  console.log('Succesfully connected to MongoDB');
  insertDocument(db, () => db.close());
});

app.get('/', (req, res) => {
  let date = new Date();
  res.status(200).json({ timestamp: date.toISOString() });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});


function insertDocument(db, callback) {
  db.collection('books').insertOne( {
    
  });
  callback();
}
