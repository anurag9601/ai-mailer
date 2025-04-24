"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSendMail = handleSendMail;
const producer_kafka_1 = require("../kafka/producer.kafka");
async function handleSendMail(req, res) {
    try {
        const { sendTo, topic } = req.body;
        const sendDataToProducer = JSON.stringify({ sendTo, topic });
        await (0, producer_kafka_1.producerWork)("work", sendDataToProducer);
        res.status(200).json({ success: true });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: `Internal server error ${error}` });
        }
    }
}
