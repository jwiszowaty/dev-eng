import { GoogleGenAI } from "@google/genai";
export async function POST(request) {
    try {
        const body = await request.json();
        const { history, message, systemInstruction } = body;
        const ai = new GoogleGenAI({});
        const config = {
            maxOutputTokens: 200,
            temperature: 0.7,
            topP: 0.7,
            topK: 70,
            systemInstruction,
        };
        const chat = ai.chats.create({
            model: "gemini-2.0-flash-lite",
            contents: history,
            config,
        });

        const response = await chat.sendMessage({ message });

        return Response.json({ success: true, data: response.text }, { status: 200 });
    } catch (error) {
        console.error("error: ", error);
        return Response.json({ success: false, error: error.message });
    }
}