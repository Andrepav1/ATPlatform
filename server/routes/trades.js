"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trades_1 = require("../util/trades");
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    (0, trades_1.getTrades)()
        .then((result) => {
        console.log(result);
        res.json(result);
    })
        .catch((error) => {
        console.log(error);
        res.json({ error });
    });
});
router.post('/close', (req, res, next) => {
    const { id } = req.body;
    console.log(id);
    (0, trades_1.closeTrade)(id)
        .then((result) => {
        // console.log();
        res.json(result);
    })
        .catch((error) => {
        res.json({ error });
    });
});
exports.default = router;
