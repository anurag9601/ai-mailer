import { Producer } from "kafkajs";
import { getKafkaInstance } from "./kafka";
import { payloadDataType } from "../controllers/sendmail.controller";

let producer: Producer | null = null;

export async function connectProducer(): Promise<Producer | null> {
    const kafka = getKafkaInstance();
    if (!kafka) {
        console.log("Kafka is not initialized ❌.");
        return null;
    }

    if (producer) return producer;

    producer = kafka.producer();
    await producer.connect();
    console.log("Kafka producer connected successfully 🚀.");
    return producer;
}

export async function producerWork(key: string, work: string) {
    const producer = await connectProducer();

    if (producer) {
        await producer.send({
            topic: "send-email-request",
            messages: [{ key, value: work }],
        });
        console.log("Kafka producer sent message successfully ✅.");
    } else {
        console.log("Kafka producer is not available 💥.");
    }
}

export async function emailSendWorkProducer(work: payloadDataType) {
    const producer = await connectProducer();

    if (producer) {
        await producer.send({
            topic: "send-email",
            messages: [{ key: "email-send-work", value: JSON.stringify(work) }],
        });
        console.log("Kafka producer sent email-send message successfully ✅.");
    } else {
        console.log("Kafka producer is not available 💥.");
    }
}
