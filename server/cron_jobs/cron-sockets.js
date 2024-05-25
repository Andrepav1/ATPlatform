"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSocket = exports.addSocket = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const simple_fxtrade_1 = __importDefault(require("simple-fxtrade"));
const accounts_1 = require("../util/accounts");
const instruments_1 = require("../util/instruments");
const bots_1 = require("../util/bots");
const activeSockets = new Set();
const emitAccountSummary = () => {
    activeSockets.forEach((socket) => {
        const { 
        // @ts-expect-error TS(2339): Property 'handshake' does not exist on type '{}'.
        handshake: { query: { accountId } } } = socket;
        (0, accounts_1.getAccountSummary)(accountId)
            .then((result) => {
            // console.log("emit summary");
            // @ts-expect-error TS(2339): Property 'emit' does not exist on type 'unknown'.
            socket.emit("Summary", result);
        })
            .catch((err) => {
            console.log("error emitting summary", err);
            // Error, don't emit anything
        });
    });
};
const emitOpenPositions = () => {
    activeSockets.forEach((socket) => {
        const { 
        // @ts-expect-error TS(2339): Property 'handshake' does not exist on type '{}'.
        handshake: { query: { accountId } } } = socket;
        simple_fxtrade_1.default.trades()
            .then(({ trades }) => {
            // console.log("emit positions");
            trades = trades.map((trade) => {
                trade.lotSize = (0, instruments_1.getInstrumentLotSize)(trade.instrument, parseInt(trade.currentUnits));
                return trade;
            });
            // @ts-expect-error TS(2339): Property 'emit' does not exist on type 'unknown'.
            socket.emit("OpenPositions", trades);
        })
            .catch((err) => {
            console.log("error emitting summary", err);
            // Error, don't emit anything
        });
    });
};
const emitBots = () => {
    activeSockets.forEach((socket) => {
        const { 
        // @ts-expect-error TS(2339): Property 'handshake' does not exist on type '{}'.
        handshake: { query: { accountId } } } = socket;
        (0, bots_1.getBots)()
            .then((bots) => {
            // console.log("emit positions");
            // @ts-expect-error TS(2339): Property 'emit' does not exist on type 'unknown'.
            socket.emit("Bots", bots);
        })
            .catch((err) => {
            console.log("error emitting summary", err);
            // Error, don't emit anything
        });
    });
};
node_cron_1.default.schedule("*/1 * * * * *", () => {
    emitAccountSummary();
    emitOpenPositions();
    emitBots();
});
const addSocket = (socket) => {
    activeSockets.add(socket);
};
exports.addSocket = addSocket;
const removeSocket = (socket) => {
    activeSockets.delete(socket);
};
exports.removeSocket = removeSocket;
