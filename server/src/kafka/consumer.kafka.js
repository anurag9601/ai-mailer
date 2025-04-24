"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = startKafkaConsumer;
const llm_1 = __importDefault(require("../services/llm"));
async function startKafkaConsumer(kafka) {
    const consumer = kafka.consumer({ groupId: "send-email-group" });
    await consumer.connect();
    await consumer.subscribe({ topics: ["send-email-request"], fromBeginning: true });
    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            try {
                if (!message.value)
                    return;
                const AIResponse = await (0, llm_1.default)(message.value.toString());
                console.log("AIResponse", AIResponse);
                // io.emit("ai-response", AIResponse);
            }
            catch (error) {
                console.log("Something went wrong in consumer while consuming the message.");
            }
        }
    });
}
