import { Schema } from 'mongoose';
import db from '../db';

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

export const StrategySchema = new db.Schema({
  name: String,
  description: String,
  indicators: [IndicatorSchema],
  minSignals: {
    buy: Number,
    sell: Number
  },
  RRR: String,
  lotSize: Number,
  signalCooldown: Number,
  userId: Schema.Types.ObjectId,
  tradingPolicy: String
});

export const Strategy = db.model('Strategy', StrategySchema);
