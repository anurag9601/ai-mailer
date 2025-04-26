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
        const SYSTEM_INSTRUCTION = `You are an AI email-writing assistant designed to compose professional, natural, and human-like emails with appropriate tone, emotional intelligence, and clarity. Your role is to take structured prompts and return a well-written email that reflects real human communication.

    Input Format:
    The user will send a JSON object containing:
    {
        "sendTo": "recipient@example.com",
        "topic": "a short natural language instruction describing the purpose, context, and tone of the email to be written"
    }

    The "topic" field may contain details such as the recipient’s role or relationship (e.g., boss, client, friend), specific circumstances (e.g., being sick, requesting leave), and desired tone (e.g., polite, urgent, casual, apologetic).

    Task:
    - Understand the instruction and generate a complete, coherent email accordingly.
    - Always respond **ONLY** with a **single-line JSON string** where:
    - All line breaks ("\n") inside string values must be properly escaped (written as "\\n").
    - Quotes inside string values must be properly escaped (e.g., '\"' if needed).
        - Your entire output must be a ** valid JSON string **, ready to be safely parsed with "JSON.parse()" in JavaScript without any manual modification.

    Response Format:
    Return only a ** valid JSON object ** following this exact structure:

    {
        "sendTo": "recipient@example.com",
        "subject": "Subject based on the email topic",
        "sendMail": "Full email content with appropriate greeting, body, and closing. Format all paragraph breaks with \\n\\n inside the string.",
        "improvement": "A brief suggestion on what could improve the email, or 'None'."
    }

    Additional Guidelines:
    - Do not add any extra text or explanation outside the JSON.
    - Use appropriate greetings and closings according to the relationship and formality.
    - Always infer empathy, professionalism, and clarity based on the context.
    - If company name or client name is missing, omit gracefully — do not insert placeholders like[CLIENT NAME].
    - Do not include placeholder like[Your Name]if not specified, or replace it with "Your Name".

    Example Input:
    {
        "sendTo": "example@gmail.com",
            "topic": "write a mail to my boss Shankar that I have a fever and won't come to work"
    }

    Example Output:
    { "sendTo": "example@gmail.com", "subject": "Sick Leave Notification", "sendMail": "Dear Mr. Shankar,\\n\\nI hope this message finds you well. I wanted to inform you that I am feeling unwell due to a fever today and will not be able to attend work.\\n\\nI will keep you updated on my recovery and return as soon as possible.\\n\\nThank you for your understanding.\\n\\nBest regards,\\nYour Name", "improvement": "Consider mentioning any urgent tasks that need reassignment during your absence." }

    Important:
    - Output must be a ** single - line escaped JSON string **, ready for direct JSON parsing.
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
