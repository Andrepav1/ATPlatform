import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import fx from 'simple-fxtrade';

require('dotenv').config();

// routes import
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import ordersRouter from './routes/orders';
import tradesRouter from './routes/trades';
import botsRouter from './routes/bots';
import strategiesRouter from './routes/strategies';
import authRouter from './routes/auth';
import accountsRouter from './routes/accounts';
import transactionsRouter from './routes/transactions';
import instrumentsRouter from './routes/instruments';
import indicatorsRouter from './routes/technical-indicators';

// Schedule cron jobs
import './cron_jobs/cron-bots';

// =========================================================================
// fx trade temporary nodemon server reloading fix
// =========================================================================
fx.configure({
  apiKey: process.env.API_KEY,
  accountId: process.env.ACCOUNT_ID,
  live: false
});
// =========================================================================

// middleware
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// setting up router
const router = express.Router();

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/trades', tradesRouter);
router.use('/bots', botsRouter);
router.use('/strategies', strategiesRouter);
router.use('/auth', authRouter);
router.use('/accounts', accountsRouter);
router.use('/transactions', transactionsRouter);
router.use('/instruments', instrumentsRouter);
router.use('/indicators', indicatorsRouter);

app.use('/api/v1', router);

// if route does not exist
app.use((_req, res, _next) => {
  res.json({ message: 'Not Found' }).status(404);
});

export default app;
