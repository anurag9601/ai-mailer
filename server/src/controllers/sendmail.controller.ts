import { Request, Response } from "express";
import { emailSendWorkProducer, producerWork } from "../kafka/producer.kafka";

export async function handleGenerateEmail(req: Request, res: Response) {
    try {
        const { sendTo, topic } = req.body;

        const sendDataToProducer = JSON.stringify({ sendTo, topic });

        await producerWork("work", sendDataToProducer);

        res.status(200).json({ success: true });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: `Internal server error ${error}` });
        }
    }
};

export interface payloadDataType {
    userEmail: string,
    userPassword: string,
    sendTo: string,
    subject: string,
    sendMail: string
}

export async function handleSendEmail(req: Request, res: Response) {
    try {
        const { sendTo, subject, sendMail } = req.body;

        const user = res.user;

        if (!user) {
            res.status(401).json({ error: "Unauthorized user." });
            return;
        }

        const payloadWordForProducer = {
            userEmail: user?.email,
            userPassword: user?.password,
            sendTo: sendTo,
            subject: subject,
            sendMail: sendMail
        }

        await emailSendWorkProducer(payloadWordForProducer);

        res.status(200).json({ success: true });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: `Internal server error ${error}` });
        }
    }
}