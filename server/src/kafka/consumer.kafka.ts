import { Kafka } from "kafkajs";
import AITextGeneration from "../services/llm";
import { io } from "../services/socket";

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

                io.emit("ai-response", AIResponse);
            } catch (error) {
                console.log("Something went wrong in consumer while consuming the message.");
                pause();
                const timeOut = setTimeout(() => {
                    consumer.resume([{ topic: "send-email-request" }]);
                    clearTimeout(timeOut);
                }, 30 * 1000);

            }
        }
    })
}