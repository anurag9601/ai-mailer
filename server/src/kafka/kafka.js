"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectKafka = connectKafka;
exports.getKafkaInstance = getKafkaInstance;
const kafkajs_1 = require("kafkajs");
const admin_kafka_1 = require("./admin.kafka");
const consumer_kafka_1 = __importDefault(require("./consumer.kafka"));
let kafkaInstance = null;
async function connectKafka() {
    if (kafkaInstance)
        return kafkaInstance;
    kafkaInstance = new kafkajs_1.Kafka({
        clientId: "my-app",
        brokers: [`${process.env.MY_IP_ADDRESS}:9092`],
    });
    console.log("Kafka connected successfully 🚀.");
    await (0, admin_kafka_1.connectKafkaAdmin)(kafkaInstance);
    await (0, consumer_kafka_1.default)(kafkaInstance);
    console.log("Consumer connected successfully 🚀.");
    return kafkaInstance;
}
function getKafkaInstance() {
    return kafkaInstance;
}
