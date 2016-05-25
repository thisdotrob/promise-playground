'use strict';

const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const json = require('body-parser').json;
const dbUrl = 'mongodb://localhost:27017/books';

app.post('/book', json(), (req, res) => {
  MongoClient.connect(dbUrl)
    .then((db) => insertBook(db, req.body))
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(503).send('Error: ' + err.message));
});

function insertBook(db, json) {
  return new Promise((resolve, reject) => {
    db.collection('books').insertOne(json)
      .then((result) => {
        db.close();
        resolve(result);
      })
      .catch((err) => reject(err));
  });
}

app.listen(3000, () => console.log('Listening on port 3000'));
