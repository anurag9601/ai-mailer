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
exports.default = sendEmailToRespectiveUser;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmailToRespectiveUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: data.userEmail,
                    pass: data.userPassword
                }
            });
            const info = yield transporter.sendMail({
                from: data.userEmail,
                to: data.sendTo,
                subject: data.subject,
                text: data.sendMail
            });
            if (info.messageId)
                return true;
            return false;
        }
        catch (error) {
            console.log("Error in sendMail function", error);
            return false;
        }
    });
}
