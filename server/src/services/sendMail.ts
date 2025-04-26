import nodemailer from "nodemailer";
import { payloadDataType } from "../controllers/sendmail.controller";

export default async function sendEmailToRespectiveUser(data: payloadDataType) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: data.userEmail,
                pass: data.userPassword
            }
        });

        const info = await transporter.sendMail({
            from: data.userEmail,
            to: data.sendTo,
            subject: data.subject,
            text: data.sendMail
        });

        if (info.messageId) return true;

        return false;

    } catch (error) {
        console.log("Error in sendMail function", error);
        return false;
    }
}