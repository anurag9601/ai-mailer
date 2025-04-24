import { Request, Response } from "express";
import { producerWork } from "../kafka/producer.kafka";

export async function handleSendMail(req: Request, res: Response) {
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
}