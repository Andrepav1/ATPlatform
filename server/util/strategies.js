"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStrategy = exports.pushNewIndicator = void 0;
const strategy_1 = require("../models/strategy");
const pushNewIndicator = (strategyId, indicator) => {
    return new Promise((resolve, reject) => {
        strategy_1.Strategy.findByIdAndUpdate(strategyId, { $push: { indicators: indicator } }, null, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
    });
};
exports.pushNewIndicator = pushNewIndicator;
const updateStrategy = (strategy) => {
    return new Promise((resolve, reject) => {
        strategy_1.Strategy.findByIdAndUpdate(strategy._id, strategy, null, (error) => {
            if (error)
                return reject(error);
            resolve(null);
        });
    });
};
exports.updateStrategy = updateStrategy;
