const socketIo = require("socket.io");

const { addSocket, removeSocket } = require('./cron-sockets');

const initSocket = (server) => {

  const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });
  
  io.on("connection", (socket) => {

    addSocket(socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      removeSocket(socket);
    });
  });
}

module.exports = initSocket;