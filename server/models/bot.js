const { Schema } = require('mongoose');
const db = require('../db');

const BotSchema = new db.Schema({
  name: String,
  activeStrategy: {
    id: Schema.Types.ObjectId,
    name: String
  },
  startTime: Date,
  endTime: Date,
  instruments: [String],
  userId: Schema.Types.ObjectId,
  live: Boolean
});

const Bot = db.model('Bot', BotSchema);

module.exports = { Bot, BotSchema };