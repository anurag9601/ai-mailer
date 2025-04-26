import { Request, Response } from "express";
import prismaClient from "../db";
import { encrypt } from "../services/crypto";

export async function userRegistration(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await prismaClient.users.findUnique({
            where: {
                email: email
            }
        });

        if (user) {
            res.status(400).json({ error: "User is already exist." });
            return;
        }

        const newUser = await prismaClient.users.create({
            data: {
                email,
                password,
            }
        });

        const payload = {
            id: newUser.id,
            email: newUser.email,
            password: newUser.password
        };

        const encryptedData = encrypt(JSON.stringify(payload));

        res.cookie("_Auth", encryptedData, {
            maxAge: 15 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ success: true });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: `Internal server error ${error}` });
        }
    }
}