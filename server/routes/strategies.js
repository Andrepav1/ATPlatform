"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const strategy_1 = require("../models/strategy");
const strategies_1 = require("../util/strategies");
const router = express_1.default.Router();
// Get all strategies
router.get('/', (req, res, next) => {
    if (req.query.id) {
        const _id = req.query.id;
        strategy_1.Strategy.findOne({ _id }, (error, strategy) => {
            if (error)
                return res.json({ error });
            res.json({ strategy });
        });
    }
    else {
        strategy_1.Strategy.find({}, (error, strategies) => {
            if (error)
                return res.json({ error });
            res.json({ strategies });
        });
    }
});
// delete strategy
router.delete('/', (req, res, next) => {
    const strategyId = req.query.id;
    strategy_1.Strategy.findByIdAndRemove(strategyId, {}, (error, strategy) => {
        if (error)
            return res.json({ error });
        res.json({ strategy });
    });
});
// create strategy
router.post('/', (req, res, next) => {
    const { strategy } = req.body;
    // Create an instance of model
    var strategy_instance = new strategy_1.Strategy(strategy);
    // Save the new model instance, passing a callback
    strategy_instance.save((error, strategy) => {
        if (error)
            return res.json({ error });
        console.log('strategy saved');
        res.json({ strategy });
    });
});
router.patch('/', (req, res, next) => {
    const { strategy } = req.body;
    console.log(strategy._id);
    // Quick fix, to remove in the future
    strategy.indicators.forEach((indicator) => delete indicator._id);
    (0, strategies_1.updateStrategy)(strategy)
        .then(() => {
        res.json({ message: 'Strategy updated successfully' });
    })
        .catch((error) => {
        console.log(error);
        res.json({ error });
    });
});
exports.default = router;
