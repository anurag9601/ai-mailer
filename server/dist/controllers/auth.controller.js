"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistration = userRegistration;
const db_1 = __importDefault(require("../db"));
const crypto_1 = require("../services/crypto");
function userRegistration(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield db_1.default.users.findUnique({
                where: {
                    email: email
                }
            });
            if (user) {
                res.status(400).json({ error: "User is already exist." });
                return;
            }
            const newUser = yield db_1.default.users.create({
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
            const encryptedData = (0, crypto_1.encrypt)(JSON.stringify(payload));
            res.cookie("_Auth", encryptedData, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 15 * 24 * 60 * 60 * 1000
            });
            res.status(201).json({ success: true });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: `Internal server error ${error}` });
            }
        }
    });
}
