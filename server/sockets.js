"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socketIo = require("socket.io");
const cron_sockets_1 = require("./cron_jobs/cron-sockets");
const initSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*"
        }
    });
    io.on("connection", (socket) => {
        (0, cron_sockets_1.addSocket)(socket);
        console.log("Client connected");
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            (0, cron_sockets_1.removeSocket)(socket);
        });
    });
};
exports.initSocket = initSocket;
