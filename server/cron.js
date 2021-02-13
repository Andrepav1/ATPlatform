const cron = require('node-cron');
var { getAccountSummary } = require('./util/accounts');

const activeSockets = new Set();

const emitAccountSummary = () => {
  activeSockets.forEach((socket) => {
    const { handshake: { query: { accountId }}} = socket;
    getAccountSummary(accountId)
    .then((result) => {
      console.log("emit summary");
      socket.emit("Summary", result);
    }).catch((err) => {
      console.log("error emitting summary", err);
      // Error, don't emit anything
    });
  })
}

cron.schedule('*/10 * * * * *', emitAccountSummary);

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