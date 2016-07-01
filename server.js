'use strict';

const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const json = require('body-parser').json;
const dbUrl = 'mongodb://localhost:27017/books';


// This example needs a corresponding .catch for each .then because they are nested...
app.get('/bad-promise-example/:stringToTransform', (req, res) => {
  removeWhiteSpace(req.params.stringToTransform)
    .then(stringWithNoWhiteSpace => {
      removeNonNumeric(stringWithNoWhiteSpace)
        .then(numericString => {
          multiplyByTen(numericString)
            .then(integer => {
              res.status(200).send(integer);
            })
            .catch(err => res.status(500).send(err.message));
        })
        .catch(err => res.status(500).send(err.message));
    })
    .catch(err => res.status(500).send(err.message));
});

// This example only needs one .catch, but is limited to a single argument for each chained promise returning function
app.get('/good-promise-example/:stringToTransform', (req, res) => {
  removeWhiteSpace(req.params.stringToTransform)
    .then(removeNonNumeric)
    .then(multiplyByTen)
    .catch(err => res.status(500).send(err.message));
});




function removeWhiteSpace(string) {
  return new Promise(resolve => {
    // throw Error('Error thrown in removeWhiteSpace');
    resolve(string.replace(/\s/g, ''));
  });
}

// If we wanted this to take more than one argument, we could use an object instead
function removeNonNumeric(string) {
  return new Promise(resolve => {
    // throw Error('Error thrown in removeNonNumeric');
    resolve(string.replace(/\D/g,''));
  });
}

function multiplyByTen(string) {
  return new Promise(resolve => {
    throw Error('Error thrown in multiplyByTen');
    let integer = Math.floor(string) * 10;
    resolve(integer.toString());
  });
}




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
