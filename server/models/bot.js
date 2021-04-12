const { Schema } = require("mongoose");
const db = require("../db");

const BotSchema = new db.Schema({
  name: String,
  activeStrategy: { type: Schema.Types.ObjectId, ref: "Strategy" },
  startTime: Date,
  endTime: Date,
  chartPeriod: String,
  instruments: [String],
  userId: Schema.Types.ObjectId,
  live: Boolean,
  openedPositions: { type: [String], default: [] },
  performance: { type: Number, default: 0 },
});

const Bot = db.model("Bot", BotSchema);

module.exports = { Bot, BotSchema };
