"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendmail_controller_1 = require("../controllers/sendmail.controller");
const protectRoute_1 = require("../services/protectRoute");
const sendMailRoute = express_1.default.Router();
sendMailRoute.post("/generate", protectRoute_1.productRoute, sendmail_controller_1.handleGenerateEmail);
sendMailRoute.post("/send", protectRoute_1.productRoute, sendmail_controller_1.handleSendEmail);
exports.default = sendMailRoute;
