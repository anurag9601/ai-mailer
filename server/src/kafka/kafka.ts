import { Kafka } from "kafkajs";
import { connectKafkaAdmin } from "./admin.kafka";
import startKafkaConsumer from "./consumer.kafka";

let kafkaInstance: Kafka | null = null;

export async function connectKafka() {
    if (kafkaInstance) return kafkaInstance;

    kafkaInstance = new Kafka({
        clientId: "my-app",
        brokers: [`${process.env.MY_IP_ADDRESS as string}:9092`],
    });

    console.log("Kafka connected successfully 🚀.");

    await connectKafkaAdmin(kafkaInstance);
    await startKafkaConsumer(kafkaInstance);

    console.log("Consumer connected successfully 🚀.");

    return kafkaInstance;
}

export function getKafkaInstance(): Kafka | null {
    return kafkaInstance;
}
