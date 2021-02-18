const { Schema } = require('mongoose');
const db = require('../db');

const IndicatorSchema = new db.Schema({
  name: String,
  config: Object,
  signalConfig: Object
});

const StrategySchema = new db.Schema({
  name: String,
  description: String,
  indicators: [IndicatorSchema],
  userId: Schema.Types.ObjectId
});

const Strategy = db.model('Strategy', StrategySchema);

module.exports = { Strategy, StrategySchema };