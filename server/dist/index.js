"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const sendmail_route_1 = __importDefault(require("./routes/sendmail.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const kafka_1 = require("./kafka/kafka");
const socket_1 = require("./services/socket");
//configuring dotenv for availing all the environment variable to the server
dotenv_1.default.config();
//enabling cors (cross origin resource sharing) to make request other urls on the server
socket_1.app.use((0, cors_1.default)({
    origin: ['http://localhost:5500', "http://127.0.0.1:5500"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));
socket_1.app.use((0, cookie_parser_1.default)());
//this will help to accept urlencoded body of the request
socket_1.app.use(express_1.default.urlencoded({ extended: false }));
//this will accept json body of the request
socket_1.app.use(express_1.default.json());
socket_1.app.use("/api/user", auth_route_1.default);
socket_1.app.use("/api/email", sendmail_route_1.default);
//starting consumer for receiving kafka producer's works
//seting value of port in the variable name port
const port = process.env.PORT || 3000;
//listing express server on port 3000 now our server can accept all requests on this port
socket_1.server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Express server is running on port ${port}`);
    yield (0, kafka_1.connectKafka)();
}));
