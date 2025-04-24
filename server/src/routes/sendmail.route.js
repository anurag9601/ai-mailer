"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendmail_controller_1 = require("../controllers/sendmail.controller");
const sendMailRoute = express_1.default.Router();
sendMailRoute.post("/send", sendmail_controller_1.handleSendMail);
exports.default = sendMailRoute;
