"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const simple_fxtrade_1 = __importDefault(require("simple-fxtrade"));
require('dotenv').config();
// routes import
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const orders_1 = __importDefault(require("./routes/orders"));
const trades_1 = __importDefault(require("./routes/trades"));
const bots_1 = __importDefault(require("./routes/bots"));
const strategies_1 = __importDefault(require("./routes/strategies"));
const auth_1 = __importDefault(require("./routes/auth"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const instruments_1 = __importDefault(require("./routes/instruments"));
const technical_indicators_1 = __importDefault(require("./routes/technical-indicators"));
// Schedule cron jobs
require("./cron_jobs/cron-bots");
// =========================================================================
// fx trade temporary nodemon server reloading fix
// =========================================================================
simple_fxtrade_1.default.configure({
    apiKey: process.env.API_KEY,
    accountId: process.env.ACCOUNT_ID,
    live: false
});
// =========================================================================
// middleware
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// setting up router
const router = express_1.default.Router();
router.use('/', index_1.default);
router.use('/users', users_1.default);
router.use('/orders', orders_1.default);
router.use('/trades', trades_1.default);
router.use('/bots', bots_1.default);
router.use('/strategies', strategies_1.default);
router.use('/auth', auth_1.default);
router.use('/accounts', accounts_1.default);
router.use('/transactions', transactions_1.default);
router.use('/instruments', instruments_1.default);
router.use('/indicators', technical_indicators_1.default);
app.use('/api/v1', router);
// if route does not exist
app.use((_req, res, _next) => {
    res.json({ message: 'Not Found' }).status(404);
});
exports.default = app;
