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
exports.connectKafkaAdmin = connectKafkaAdmin;
function connectKafkaAdmin(kafka) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = kafka.admin();
        yield admin.connect();
        const existingTopics = yield admin.listTopics();
        if (!existingTopics.includes("send-email-request")) {
            yield admin.createTopics({
                topics: [
                    {
                        topic: "send-email-request",
                        numPartitions: 1,
                    },
                ],
            });
        }
        if (!existingTopics.includes("send-email")) {
            yield admin.createTopics({
                topics: [
                    {
                        topic: "send-email",
                        numPartitions: 1,
                    }
                ]
            });
        }
        console.log("Admin connected successfully 🚀.");
        yield admin.disconnect();
    });
}
