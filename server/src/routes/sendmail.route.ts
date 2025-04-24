import express from "express";
import { handleSendMail } from "../controllers/sendmail.controller";

const sendMailRoute = express.Router();

sendMailRoute.post("/send", handleSendMail)

export default sendMailRoute;