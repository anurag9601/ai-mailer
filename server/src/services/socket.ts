import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

//initialized express app
const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User is connected with socket ID", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })
});

export { app, server, io }
