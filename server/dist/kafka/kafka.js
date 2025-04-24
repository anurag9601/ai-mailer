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
exports.connectKafka = connectKafka;
exports.getKafkaInstance = getKafkaInstance;
const kafkajs_1 = require("kafkajs");
const admin_kafka_1 = require("./admin.kafka");
const consumer_kafka_1 = __importDefault(require("./consumer.kafka"));
let kafkaInstance = null;
function connectKafka() {
    return __awaiter(this, void 0, void 0, function* () {
        if (kafkaInstance)
            return kafkaInstance;
        kafkaInstance = new kafkajs_1.Kafka({
            clientId: "my-app",
            brokers: [`${process.env.MY_IP_ADDRESS}:9092`],
        });
        console.log("Kafka connected successfully 🚀.");
        yield (0, admin_kafka_1.connectKafkaAdmin)(kafkaInstance);
        yield (0, consumer_kafka_1.default)(kafkaInstance);
        console.log("Consumer connected successfully 🚀.");
        return kafkaInstance;
    });
}
function getKafkaInstance() {
    return kafkaInstance;
}
