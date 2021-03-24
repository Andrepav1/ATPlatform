const { Schema } = require('mongoose');
const db = require('../db');

const SignalSchema = new db.Schema({
  type: String,
  comparison: Number,
  a: String,
  b: String,
  bN: Number
});

const IndicatorSchema = new db.Schema({
  name: String,
  config: Object,
  signals: [SignalSchema]
});

const StrategySchema = new db.Schema({
  name: String,
  description: String,
  indicators: [IndicatorSchema],
  minSignals: {
    buy: Number,
    sell: Number
  },
  RRR: String,
  userId: Schema.Types.ObjectId
});

const Strategy = db.model('Strategy', StrategySchema);

module.exports = { Strategy, StrategySchema };