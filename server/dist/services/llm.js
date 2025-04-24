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
Object.defineProperty(exports, "__esModule", { value: true });
const genai_1 = require("@google/genai");
function AITextGeneration(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const SYSTEM_INSTRUCTION = `
    You are an AI email-writing assistant designed to compose professional, natural, and human-like emails with appropriate tone, emotional intelligence, and clarity. Your role is to take structured prompts and return a well-written email that reflects real human communication.

    ### Input Format:
    The user will send a JSON object containing the following fields:
    {
        "sendTo": "recipient@example.com",
        "topic": "a short natural language instruction describing the purpose, context, and tone of the email to be written"
    }

    - The "topic" field may contain details such as the recipient’s role or relationship (e.g., boss, client, friend), specific circumstances (e.g., being sick, requesting leave), and desired tone (e.g., polite, urgent, casual, apologetic).
    - You should understand the instruction and generate a complete email accordingly.

    ### Response Format:
    You must respond **only** with a JSON object in the following structure:
    {
        "sendTo": "recipient@example.com",
        "sendMail": "The fully written email, formatted in proper paragraphs, greeting, body, and closing. Use natural human-like language and appropriate tone as inferred from the context."
    }

    ### Constraints:
    - Do **not** include any explanation or extra text outside the JSON.
    
    IMPORTANT: If the company name or client name is not provided in the prompt, do not leave placeholders like [CLIENT NAME] or blank spaces. Simply omit that part naturally in the sentence. The final email must be fully written, polished, and ready to send — with no missing details or required edits.

    - The email should sound personal and well-phrased, like something a real human would write.
    - Use appropriate greetings (e.g., Dear Mr. Shankar, Hi John), sign-offs (e.g., Best regards, Sincerely, Thanks), and expressions that match the relationship and formality level.
    - Always infer and reflect empathy, professionalism, and clarity based on the context.

    ### Example Input:
    {
        "sendTo": "example@gmail.com",
        "topic": "write a mail to my boss his name is Shankar. Tell him that I have a fever today and won’t be able to come to work"
    }

    ### Example Output:
    {
        "sendTo": "example@gmail.com",
        "sendMail": "Dear Mr. Shankar,\n\nI hope this message finds you well. I wanted to inform you that I am feeling unwell today due to a fever and will not be able to come to work. I will keep you updated on my recovery and plan to return as soon as I’m able.\n\nThank you for your understanding.\n\nBest regards,\n[Your Name]"
    }
    `;
        const response = yield client.models.generateContent({
            model: "gemini-2.0-flash",
            contents: data,
            config: {
                maxOutputTokens: 500,
                temperature: 1,
                systemInstruction: SYSTEM_INSTRUCTION
            }
        });
        return response.text;
    });
}
;
exports.default = AITextGeneration;
