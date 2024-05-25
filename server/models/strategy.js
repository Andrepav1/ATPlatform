"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = exports.StrategySchema = void 0;
const mongoose_1 = require("mongoose");
const db_1 = __importDefault(require("../db"));
const SignalSchema = new db_1.default.Schema({
    type: String,
    comparison: Number,
    a: String,
    b: String,
    bN: Number
});
const IndicatorSchema = new db_1.default.Schema({
    name: String,
    config: Object,
    signals: [SignalSchema]
});
exports.StrategySchema = new db_1.default.Schema({
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
    userId: mongoose_1.Schema.Types.ObjectId,
    tradingPolicy: String
});
exports.Strategy = db_1.default.model('Strategy', exports.StrategySchema);
