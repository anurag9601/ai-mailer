import { Kafka } from "kafkajs";
import AITextGeneration from "../services/llm";

export default async function startKafkaConsumer(kafka: Kafka) {

    const consumer = kafka.consumer({ groupId: "send-email-group" });

    await consumer.connect();

    await consumer.subscribe({ topics: ["send-email-request"], fromBeginning: true });

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            try {
                if (!message.value) return;

                const AIResponse = await AITextGeneration(message.value.toString() as string);

                console.log("AIResponse", AIResponse);
            } catch (error) {
                console.log("Something went wrong in consumer while consuming the message.");
            }
        }
    })
}