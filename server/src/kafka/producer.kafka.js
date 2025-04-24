"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectProducer = connectProducer;
exports.producerWork = producerWork;
const kafka_1 = require("./kafka");
let producer = null;
async function connectProducer() {
    const kafka = (0, kafka_1.getKafkaInstance)();
    if (!kafka) {
        console.log("Kafka is not initialized ❌.");
        return null;
    }
    if (producer)
        return producer;
    producer = kafka.producer();
    await producer.connect();
    console.log("Kafka producer connected successfully 🚀.");
    return producer;
}
async function producerWork(key, work) {
    const producer = await connectProducer();
    if (producer) {
        await producer.send({
            topic: "send-email-request",
            messages: [{ key, value: work }],
        });
        console.log("Kafka producer sent message successfully ✅.");
    }
    else {
        console.log("Kafka producer is not available 💥.");
    }
}
