import { Kafka } from "kafkajs";
import AITextGeneration from "../services/llm";
import { io } from "../services/socket";
import { payloadDataType } from "../controllers/sendmail.controller";
import sendEmailToRespectiveUser from "../services/sendMail";

export default async function startKafkaConsumer(kafka: Kafka) {

    const consumer = kafka.consumer({ groupId: "send-email-group" });

    await consumer.connect();

    await consumer.subscribe({ topics: ["send-email-request", "send-email"], fromBeginning: true });

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ topic, message, pause }) => {
            if (topic === "send-email-request") {
                try {
                    if (!message.value) return;

                    const AIResponse = await AITextGeneration(message.value.toString() as string);

                    io.emit("ai-response", AIResponse?.slice(7, -3));
                } catch (error) {
                    console.log("Something went wrong in consumer while consuming the message.");
                    pause();
                    const timeOut = setTimeout(() => {
                        consumer.resume([{ topic: "send-email-request" }]);
                        clearTimeout(timeOut);
                    }, 30 * 1000);
                }
            }

            if (topic === "send-email") {
                try {
                    if (!message.value) return;

                    const allInfo: payloadDataType = JSON.parse(message.value.toString());

                    const mailSent = await sendEmailToRespectiveUser(allInfo);

                    if (mailSent === true) {
                        io.emit("mail-sent-status", `✅ Email sent to ${allInfo.sendTo} for ${allInfo.subject}`);
                    } else {
                        io.emit("mail-sent-status", `❌ Email send Failed to ${allInfo.sendTo} for ${allInfo.subject}`);
                    }
                } catch (error) {
                    console.log("Something went wrong in consumer while consuming the message.");
                    pause();
                    const timeOut = setTimeout(() => {
                        consumer.resume([{ topic: "send-email" }]);
                        clearTimeout(timeOut);
                    }, 30 * 1000);
                }
            }
        }
    })
}