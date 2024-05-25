const socketIo = require("socket.io");

import { addSocket, removeSocket } from "./cron_jobs/cron-sockets";

export const initSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*"
    }
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
