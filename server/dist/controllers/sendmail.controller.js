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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGenerateEmail = handleGenerateEmail;
exports.handleSendEmail = handleSendEmail;
const producer_kafka_1 = require("../kafka/producer.kafka");
function handleGenerateEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { sendTo, topic } = req.body;
            const sendDataToProducer = JSON.stringify({ sendTo, topic });
            yield (0, producer_kafka_1.producerWork)("work", sendDataToProducer);
            res.status(200).json({ success: true });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: `Internal server error ${error}` });
            }
        }
    });
}
;
function handleSendEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { sendTo, subject, sendMail } = req.body;
            const user = res.user;
            if (!user) {
                res.status(401).json({ error: "Unauthorized user." });
                return;
            }
            const payloadWordForProducer = {
                userEmail: user === null || user === void 0 ? void 0 : user.email,
                userPassword: user === null || user === void 0 ? void 0 : user.password,
                sendTo: sendTo,
                subject: subject,
                sendMail: sendMail
            };
            yield (0, producer_kafka_1.emailSendWorkProducer)(payloadWordForProducer);
            res.status(200).json({ success: true });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: `Internal server error ${error}` });
            }
        }
    });
}
