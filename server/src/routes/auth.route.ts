import express from "express";
import { userRegistration } from "../controllers/auth.controller";

const authRoute = express.Router();

authRoute.post("/register", userRegistration)

export default authRoute;