const db = require('../db');
const Indicator = require('./technical-indicator');

const strategySchema = new db.Schema({
  name: String,
  description: String,
  indicators: [Indicator]
});

const Strategy = db.model('Strategy', strategySchema);

module.exports = Strategy;