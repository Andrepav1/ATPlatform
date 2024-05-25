import { Schema } from "mongoose";
import db from "../db";

interface IBot {
  name: string;
}

export const BotSchema = new db.Schema({
  name: String,
  activeStrategy: { type: Schema.Types.ObjectId, ref: "Strategy" },
  startTime: Date,
  endTime: Date,
  chartPeriod: String,
  instruments: [String],
  userAPIkey: String,
  live: Boolean,
  openedPositions: { type: [String], default: [] },
  performance: { type: Number, default: 0 }
});

export const Bot = db.model("Bot", BotSchema);
