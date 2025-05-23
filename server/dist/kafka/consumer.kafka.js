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
exports.default = startKafkaConsumer;
const llm_1 = __importDefault(require("../services/llm"));
const socket_1 = require("../services/socket");
const sendMail_1 = __importDefault(require("../services/sendMail"));
function startKafkaConsumer(kafka) {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: "send-email-group" });
        yield consumer.connect();
        yield consumer.subscribe({ topics: ["send-email-request", "send-email"], fromBeginning: true });
        yield consumer.run({
            autoCommit: true,
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, message, pause }) {
                if (topic === "send-email-request") {
                    try {
                        if (!message.value)
                            return;
                        const AIResponse = yield (0, llm_1.default)(message.value.toString());
                        socket_1.io.emit("ai-response", AIResponse === null || AIResponse === void 0 ? void 0 : AIResponse.slice(7, -3));
                    }
                    catch (error) {
                        console.log("Something went wrong in consumer while consuming the message.");
                        pause();
                        const timeOut = setTimeout(() => {
                            consumer.resume([{ topic: "send-email-request" }]);
                            clearTimeout(timeOut);
                        }, 30 * 1000);
                    }
                }
                if (topic === "send-email") {
                    try {
                        if (!message.value)
                            return;
                        const allInfo = JSON.parse(message.value.toString());
                        const mailSent = yield (0, sendMail_1.default)(allInfo);
                        if (mailSent === true) {
                            socket_1.io.emit("mail-sent-status", `✅ Email sent to ${allInfo.sendTo} for ${allInfo.subject}`);
                        }
                        else {
                            socket_1.io.emit("mail-sent-status", `❌ Email send Failed to ${allInfo.sendTo} for ${allInfo.subject}`);
                        }
                    }
                    catch (error) {
                        console.log("Something went wrong in consumer while consuming the message.");
                        pause();
                        const timeOut = setTimeout(() => {
                            consumer.resume([{ topic: "send-email" }]);
                            clearTimeout(timeOut);
                        }, 30 * 1000);
                    }
                }
            })
        });
    });
}
