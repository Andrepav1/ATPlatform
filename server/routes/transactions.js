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
const accounts_1 = require("../util/accounts");
const router = express_1.default.Router();
const TRANSACTION_PER_PAGE = 20;
const getTransactionSinceId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield simple_fxtrade_1.default.transactions.sinceid({ id });
});
const getTransactionsPage = (page, accountId) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSummary = yield (0, accounts_1.getAccountSummary)(accountId);
    const sinceId = parseInt(accountSummary.lastTransactionID) - page * TRANSACTION_PER_PAGE;
    return yield getTransactionSinceId(sinceId);
});
/*Gets n transaction pages. */
router.get('/', (req, res, next) => {
    const { page, accountId } = req.query;
    let tPage = page ? parseInt(String(page)) : 1;
    getTransactionsPage(tPage, accountId)
        .then(({ transactions }) => {
        res.json(transactions);
    })
        .catch((error) => {
        res.json({ error });
    });
});
router.get('/idrange', (req, res, next) => {
    const { from, to } = req.query;
    simple_fxtrade_1.default.transactions
        .idrange({ from, to })
        .then((result) => {
        res.json(result);
    })
        .catch((error) => {
        res.json({ error });
    });
});
router.get('/sinceid/', (req, res, next) => {
    const { id } = req.query;
    getTransactionSinceId(id)
        .then((result) => {
        console.log('res', result);
        res.json(result);
    })
        .catch((error) => {
        console.log(error);
        res.json({ error });
    });
});
exports.default = router;
