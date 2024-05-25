"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = exports.BotSchema = void 0;
const mongoose_1 = require("mongoose");
const db_1 = __importDefault(require("../db"));
exports.BotSchema = new db_1.default.Schema({
    name: String,
    activeStrategy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Strategy" },
    startTime: Date,
    endTime: Date,
    chartPeriod: String,
    instruments: [String],
    userAPIkey: String,
    live: Boolean,
    openedPositions: { type: [String], default: [] },
    performance: { type: Number, default: 0 }
});
exports.Bot = db_1.default.model("Bot", exports.BotSchema);
