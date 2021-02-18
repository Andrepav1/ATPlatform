const { Schema } = require('mongoose');
const db = require('../db');

const BotSchema = new db.Schema({
  name: String,
  activeStrategyId: Schema.Types.ObjectId,
  startTime: Date,
  endTime: Date,
  instruments: [String],
  userId: Schema.Types.ObjectId
});

const Bot = db.model('Bot', BotSchema);

module.exports = { Bot, BotSchema };