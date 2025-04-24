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
const sendmail_route_1 = __importDefault(require("./routes/sendmail.route"));
const kafka_1 = require("./kafka/kafka");
//configuring dotenv for availing all the environment variable to the server
dotenv_1.default.config();
//initialized express app
const app = (0, express_1.default)();
//enabling cors (cross origin resource sharing) to make request other urls on the server
app.use((0, cors_1.default)());
//this will help to accept urlencoded body of the request
app.use(express_1.default.urlencoded({ extended: false }));
//this will accept json body of the request
app.use(express_1.default.json());
app.use("/api/email", sendmail_route_1.default);
//starting consumer for receiving kafka producer's works
//seting value of port in the variable name port
const port = process.env.PORT || 3000;
//listing express server on port 3000 now our server can accept all requests on this port
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Express server is running on port ${port}`);
    yield (0, kafka_1.connectKafka)();
}));
