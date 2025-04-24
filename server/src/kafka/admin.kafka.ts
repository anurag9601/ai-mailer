import { Kafka } from "kafkajs";

export async function connectKafkaAdmin(kafka: Kafka) {
    const admin = kafka.admin();

    await admin.connect();

    const existingTopics = await admin.listTopics();

    if (!existingTopics.includes("send-email-request")) {
        await admin.createTopics({
            topics: [
                {
                    topic: "send-email-request",
                    numPartitions: 1,
                },
            ],
        });
    }

    console.log("Admin connected successfully 🚀.");

    await admin.disconnect();
}