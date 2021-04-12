const socketIo = require("socket.io");

const { addSocket, removeSocket } = require("./cron_jobs/cron-sockets");

const initSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    addSocket(socket);
    console.log("Client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      removeSocket(socket);
    });
  });
};

module.exports = initSocket;
