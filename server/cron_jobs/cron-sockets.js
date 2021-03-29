const cron = require('node-cron');
var { getAccountSummary } = require('../util/accounts');
const fx = require('simple-fxtrade');
const { getInstrumentLotSize } = require('../util/instruments');

const activeSockets = new Set();

const emitAccountSummary = () => {
  activeSockets.forEach((socket) => {
    const { handshake: { query: { accountId }}} = socket;
    getAccountSummary(accountId)
    .then((result) => {
      // console.log("emit summary");
      socket.emit("Summary", result);
    }).catch((err) => {
      console.log("error emitting summary", err);
      // Error, don't emit anything
    });
  })
}

const emitOpenPositions = () => {
  activeSockets.forEach((socket) => {
    const { handshake: { query: { accountId }}} = socket;
    fx.trades()
    .then(({trades}) => {
      // console.log("emit positions");
      trades = trades.map((trade) => {
        trade.lotSize = getInstrumentLotSize(trade.instrument, parseInt(trade.currentUnits));
        return trade;
      });

      socket.emit("OpenPositions", trades);
    }).catch((err) => {
      console.log("error emitting summary", err);
      // Error, don't emit anything
    });
  })
}

cron.schedule('*/1 * * * * *', emitAccountSummary);
cron.schedule('*/1 * * * * *', emitOpenPositions);

const addSocket = (socket) => {
  activeSockets.add(socket);
}

const removeSocket = (socket) => {
  activeSockets.delete(socket);
}

module.exports = {
  addSocket,
  removeSocket
}