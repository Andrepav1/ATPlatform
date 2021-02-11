const { Timestamp } = require('mongodb');
const { ObjectID } = require('mongodb');
const db = require('../db');

const strategySchema = new db.Schema({
  name: String,
  description: String
});

const Strategy = db.model('Strategy', strategySchema);

module.exports = Strategy;