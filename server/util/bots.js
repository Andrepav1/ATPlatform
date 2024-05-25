"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBot = exports.getBots = exports.calculateBots = exports.calculateBot = exports.getInstrumentSignal = void 0;
const bot_1 = require("../models/bot");
const constants_1 = require("./constants");
const instruments_1 = require("./instruments");
const orders_1 = require("./orders");
const trades_1 = require("./trades");
const technical_indicator_1 = require("./technical-indicator");
const mailer_1 = require("../mailer");
// Calculates a buy/sell/neutral signal for each of the indicators
// and use them together to produce a single signal for the given instrument
const getInstrumentSignal = (strategy, candles) => {
    let buyTriggers = 0;
    let sellTriggers = 0;
    // prices from oldest to newest
    let prices = (0, technical_indicator_1.extractInputData)(candles, ["values"]).values;
    strategy.indicators.forEach((indicator) => {
        let tiValues = (0, technical_indicator_1.getIndicatorValues)(indicator, candles);
        try {
            let signal = (0, technical_indicator_1.getIndicatorSignal)(indicator, tiValues, prices);
            switch (signal) {
                case constants_1.Signal.BUY:
                    buyTriggers++;
                    break;
                case constants_1.Signal.SELL:
                    sellTriggers++;
                    break;
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    // console.log("BuyTriggers", buyTriggers, " - sellTriggers", sellTriggers);
    if (buyTriggers >= strategy.minSignals.buy &&
        sellTriggers < strategy.minSignals.sell) {
        return constants_1.Signal.BUY;
    }
    else if (sellTriggers >= strategy.minSignals.sell &&
        buyTriggers < strategy.minSignals.buy) {
        return constants_1.Signal.SELL;
    }
    else {
        // In the case that neither or both BUY and SELL reach the signal threshold.
        return constants_1.Signal.NEUTRAL;
    }
};
exports.getInstrumentSignal = getInstrumentSignal;
const calculateBot = (bot) => __awaiter(void 0, void 0, void 0, function* () {
    const { activeStrategy, chartPeriod, instruments, userAPIkey } = bot;
    try {
        let instrumentsData = yield (0, instruments_1.getInstruments)(instruments, chartPeriod);
        instrumentsData.forEach(({ candles, instrument }) => {
            // removing last candle if it is not complete
            if (!candles[candles.length - 1].complete) {
                candles.pop();
            }
            // Get instrument signal
            let instrumentSignal = (0, exports.getInstrumentSignal)(activeStrategy, candles);
            let units;
            switch (instrumentSignal) {
                case constants_1.Signal.BUY:
                    console.log("[" + instrument + "] BUY SIGNAL!! TO THE MOON!!!");
                    units = (0, instruments_1.getInstrumentUnits)(instrument, parseFloat(activeStrategy.lotSize)); // positive lotSize to get BUY order
                    (0, mailer_1.sendMail)(userAPIkey, { instrument, units, bot });
                    placeStrategyOrder(instrument, units, bot); // place order, following trading policy
                    break;
                case constants_1.Signal.SELL:
                    console.log("[" + instrument + "] SELL SIGNAL!!");
                    units = (0, instruments_1.getInstrumentUnits)(instrument, -parseFloat(activeStrategy.lotSize)); // negative lotSize to get SELL order
                    (0, mailer_1.sendMail)(userAPIkey, { instrument, units, bot });
                    placeStrategyOrder(instrument, units, bot);
                    break;
                case constants_1.Signal.NEUTRAL:
                    console.log("[" + instrument + "] NO SIGNAL");
                    // WHAT TO DO HERE DEPENDS ON THE POLICY
                    break;
                default:
                    break;
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.calculateBot = calculateBot;
const calculateBots = (chartPeriod) => __awaiter(void 0, void 0, void 0, function* () {
    let now = new Date(Date.now());
    console.log("[" + now.getHours() + ":" + now.getMinutes() + "] " + chartPeriod + " Bots");
    try {
        // get active bots
        const bots = yield (0, exports.getBots)({ chartPeriod, live: true });
        bots.forEach((bot) => {
            console.log("[BOT] " + bot.name);
            (0, exports.calculateBot)(bot);
        });
    }
    catch (error) {
        console.log(error.errorMessage);
    }
});
exports.calculateBots = calculateBots;
const filterBotPositions = (trades, openedPositions, instrument) => {
    return trades.filter(({ id, instrument: tradeInstrument }) => {
        return openedPositions.includes(id) && tradeInstrument == instrument;
    });
};
const placeStrategyOrder = (instrument, units, bot) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, openedPositions } = bot;
    try {
        // Get BOT opened position
        let { trades } = yield (0, trades_1.getTrades)();
        let botPositions = filterBotPositions(trades, openedPositions, instrument);
        let closedTrade;
        let closedPositions = [];
        for (let i = 0; i < botPositions.length; i++) {
            if (botPositions[i].currentUnits >= 0 && units < 0) {
                // opened position is BUY, new order is SELL
                closedTrade = yield (0, trades_1.closeTrade)(botPositions[i].id);
                closedPositions.push({
                    id: closedTrade.orderFillTransaction.id,
                    performance: parseFloat(closedTrade.orderFillTransaction.pl)
                });
            }
            else if (botPositions[i].currentUnits < 0 && units >= 0) {
                // opened position is SELL, new order is BUY
                closedTrade = yield (0, trades_1.closeTrade)(botPositions[i].id);
                closedPositions.push({
                    id: closedTrade.orderFillTransaction.id,
                    performance: parseFloat(closedTrade.orderFillTransaction.pl)
                });
            }
            else {
                // opened position and new order are of same type, what to do here depends on the strategy : TODO
            }
        }
        // calculate new performance after having closed positions
        let newPerformance = 0;
        for (let i = 0; i < closedPositions.length; i++) {
            // newOpenedPositions.filter((pos) => pos !== closedPositions[i].id); // TODO MAYBE
            newPerformance += closedPositions[i].performance;
        }
        // round to 2 decimal places
        let decimalPlaces = 2;
        newPerformance =
            Math.round((newPerformance + Number.EPSILON) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
        updateBotPerformance(_id, newPerformance);
        // Place new order and add ID into the bot openedPositions
        const { lastTransactionID } = yield (0, orders_1.placeOrder)(instrument, units);
        pushNewOpenedPosition(_id, lastTransactionID);
    }
    catch (error) {
        console.log(error);
    }
});
const getBots = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (params = {}) {
    return yield bot_1.Bot.find(params).populate("activeStrategy");
});
exports.getBots = getBots;
const pushNewOpenedPosition = (botId, positionId) => {
    return new Promise((resolve, reject) => {
        bot_1.Bot.findByIdAndUpdate(botId, { $push: { openedPositions: positionId } }, null, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
    });
};
const updateBotPerformance = (botId, variance) => {
    return new Promise((resolve, reject) => {
        bot_1.Bot.findByIdAndUpdate(botId, { $inc: { performance: variance } }, null, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
    });
};
const updateBot = (id, updateObj) => {
    return new Promise((resolve, reject) => {
        bot_1.Bot.findByIdAndUpdate(id, { $set: updateObj }, null, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
    });
};
exports.updateBot = updateBot;
