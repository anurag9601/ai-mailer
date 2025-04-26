import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import sendMailRoute from "./routes/sendmail.route";
import authRoute from "./routes/auth.route";

import { connectKafka } from "./kafka/kafka";
import { app, server } from "./services/socket";

//configuring dotenv for availing all the environment variable to the server
dotenv.config();

//enabling cors (cross origin resource sharing) to make request other urls on the server
app.use(cors({
    origin: ['http://localhost:5500', "http://127.0.0.1:5500"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

app.use(cookieParser());

//this will help to accept urlencoded body of the request
app.use(express.urlencoded({ extended: false }));

//this will accept json body of the request
app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/email", sendMailRoute);

//starting consumer for receiving kafka producer's works

//seting value of port in the variable name port
const port = process.env.PORT || 3000;

//listing express server on port 3000 now our server can accept all requests on this port
server.listen(port, async () => {
    console.log(`Express server is running on port ${port}`);
    await connectKafka();
});



