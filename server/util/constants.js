"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comparison = exports.Signal = exports.CFD_UNIT = exports.METAL_UNIT = exports.CURRENCY_UNIT = void 0;
exports.CURRENCY_UNIT = 100000;
exports.METAL_UNIT = 5000;
exports.CFD_UNIT = 100;
exports.Signal = {
    STRONG_SELL: 0,
    SELL: 1,
    NEUTRAL: 2,
    BUY: 3,
    STRONG_BUY: 4,
};
exports.Comparison = {
    LESS_THAN: 0,
    EQUALS: 1,
    GREATER_THAN: 2,
    CROSS_DOWN: 3,
    CROSS: 4,
    CROSS_UP: 5,
    NO_CROSS: 6,
};
