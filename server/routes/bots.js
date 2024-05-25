"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bots_1 = require("../util/bots");
const bot_1 = require("../models/bot");
const router = express_1.default.Router();
// Get all bots
router.get('/', (req, res, next) => {
    (0, bots_1.getBots)()
        .then((bots) => {
        // console.log(bots);
        res.json({ bots });
    })
        .catch((error) => {
        // console.log(error);
        res.json({ error });
    });
});
// get single bot
router.get('/', (req, res, next) => { });
// delete bot
router.delete('/', (req, res, next) => { });
// create bot
router.post('/', (req, res, next) => {
    const { bot } = req.body;
    // Create an instance of model
    var bot_instance = new bot_1.Bot(bot);
    // Save the new model instance, passing a callback
    bot_instance.save((error) => {
        if (error)
            return res.json({ error });
        console.log('bot saved');
        res.json({ bot });
    });
});
router.put('/update', (req, res, next) => {
    const { id, live } = req.body;
    (0, bots_1.updateBot)(id, { live })
        .then((result) => {
        res.json(result);
    })
        .catch((error) => {
        res.json({ error });
    });
});
exports.default = router;
