import express from "express";
import { handleGenerateEmail, handleSendEmail } from "../controllers/sendmail.controller";
import { productRoute } from "../services/protectRoute";

const sendMailRoute = express.Router();

sendMailRoute.post("/generate", productRoute, handleGenerateEmail);

sendMailRoute.post("/send", productRoute, handleSendEmail)

export default sendMailRoute;