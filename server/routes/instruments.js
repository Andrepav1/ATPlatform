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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const simple_fxtrade_1 = __importDefault(require("simple-fxtrade"));
const instruments_1 = require("../util/instruments");
const router = express_1.default.Router();
// get all instruments
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { instruments } = yield simple_fxtrade_1.default.instruments();
        instruments.sort((a, b) => a.name.localeCompare(b.name));
        res.json({ instruments });
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
}));
// get all instruments
router.get('/candles/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, granularity, count } = req.body;
    (0, instruments_1.getInstrument)({ id, granularity, count })
        .then((result) => {
        res.json(result);
    })
        .catch((error) => {
        res.json({ error });
    });
}));
exports.default = router;
