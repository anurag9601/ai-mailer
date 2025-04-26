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
exports.connectProducer = connectProducer;
exports.producerWork = producerWork;
exports.emailSendWorkProducer = emailSendWorkProducer;
const kafka_1 = require("./kafka");
let producer = null;
function connectProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        const kafka = (0, kafka_1.getKafkaInstance)();
        if (!kafka) {
            console.log("Kafka is not initialized ❌.");
            return null;
        }
        if (producer)
            return producer;
        producer = kafka.producer();
        yield producer.connect();
        console.log("Kafka producer connected successfully 🚀.");
        return producer;
    });
}
function producerWork(key, work) {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = yield connectProducer();
        if (producer) {
            yield producer.send({
                topic: "send-email-request",
                messages: [{ key, value: work }],
            });
            console.log("Kafka producer sent message successfully ✅.");
        }
        else {
            console.log("Kafka producer is not available 💥.");
        }
    });
}
function emailSendWorkProducer(work) {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = yield connectProducer();
        if (producer) {
            yield producer.send({
                topic: "send-email",
                messages: [{ key: "email-send-work", value: JSON.stringify(work) }],
            });
            console.log("Kafka producer sent email-send message successfully ✅.");
        }
        else {
            console.log("Kafka producer is not available 💥.");
        }
    });
}
