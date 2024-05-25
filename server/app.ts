//3rd party import
import express from "express";
import cookieParser from "cookie-parser";
// const cors = require("cors");
import cors from "cors";
import logger from "morgan";
require("dotenv").config();

// Schedule cron jobs
import "./cron_jobs/cron-bots";

// routes import
import indexRouter from "./routes/index";
var usersRouter = require("./routes/users");
var ordersRouter = require("./routes/orders");
var tradesRouter = require("./routes/trades");
var botsRouter = require("./routes/bots");
var strategiesRouter = require("./routes/strategies");
var authRouter = require("./routes/auth");
var accountsRouter = require("./routes/accounts");
var transactionsRouter = require("./routes/transactions");
var instrumentsRouter = require("./routes/instruments");
var indicatorsRouter = require("./routes/technical-indicators");

// =========================================================================
// fx trade temporary nodemon server reloading fix  (TO REMOVE)
// =========================================================================
var fx = require("simple-fxtrade");
fx.configure({
  apiKey: process.env.API_KEY,
  accountId: process.env.ACCOUNT_ID,
  live: false,
});
// =========================================================================

// middleware
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// setting up router
var router = express.Router();

router.use("/", indexRouter);
router.use("/users", usersRouter);
router.use("/orders", ordersRouter);
router.use("/trades", tradesRouter);
router.use("/bots", botsRouter);
router.use("/strategies", strategiesRouter);
router.use("/auth", authRouter);
router.use("/accounts", accountsRouter);
router.use("/transactions", transactionsRouter);
router.use("/instruments", instrumentsRouter);
router.use("/indicators", indicatorsRouter);

app.use("/api/v1", router);

// if route does not exist
app.use((req, res, next) => {
  res.json({ message: "Not Found" }).status(404);
});

module.exports = app;
