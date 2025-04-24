"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const sendmail_route_1 = __importDefault(require("./routes/sendmail.route"));
const kafka_1 = require("./kafka/kafka");
const socket_1 = require("./services/socket");
//configuring dotenv for availing all the environment variable to the server
dotenv_1.default.config();
//enabling cors (cross origin resource sharing) to make request other urls on the server
socket_1.app.use((0, cors_1.default)());
//this will help to accept urlencoded body of the request
socket_1.app.use(express_1.default.urlencoded({ extended: false }));
//this will accept json body of the request
socket_1.app.use(express_1.default.json());
socket_1.app.use("/api/email", sendmail_route_1.default);
//starting consumer for receiving kafka producer's works
//seting value of port in the variable name port
const port = process.env.PORT || 3000;
//listing express server on port 3000 now our server can accept all requests on this port
socket_1.server.listen(port, async () => {
    console.log(`Express server is running on port ${port}`);
    await (0, kafka_1.connectKafka)();
});
