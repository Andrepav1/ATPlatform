"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const simple_fxtrade_1 = __importDefault(require("simple-fxtrade"));
const accounts_1 = require("../util/accounts");
const router = express_1.default.Router();
router.get('/', function (req, res, next) {
    const { apiKey, live } = req.query;
    // live is turned to string, need to turn it back to boolean
    let isLive = live == 'true';
    simple_fxtrade_1.default.configure({ apiKey, live: isLive });
    (0, accounts_1.getAccounts)()
        .then(({ accounts }) => {
        const promises = [];
        for (let i = 0; i < accounts.length; i++) {
            promises.push((0, accounts_1.getAccountSummary)(accounts[i].id));
        }
        Promise.all(promises)
            .then((accounts) => {
            res.json({ accounts });
        })
            .catch((error) => {
            console.log(error);
            res.json({ error });
        });
    })
        .catch((error) => {
        console.log(error);
        res.json({ error });
    });
});
router.get('/summary', function (req, res, next) {
    const { accountId } = req.query;
    (0, accounts_1.getAccountSummary)(accountId)
        .then((result) => {
        res.json(result);
    })
        .catch((error) => {
        console.log(error);
        res.json(error);
    });
});
exports.default = router;
