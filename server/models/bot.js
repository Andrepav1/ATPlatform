const { ObjectID } = require('mongodb');
const db = require('../db');

const botSchema = new db.Schema({
  name: String,
  activeStrategy: ObjectID,
  startTime: Timestamp,
  endTime: Timestamp,
  instruments: [String],
  userID: ObjectID
});

const Bot = db.model('Bot', botSchema);

module.exports = Bot;