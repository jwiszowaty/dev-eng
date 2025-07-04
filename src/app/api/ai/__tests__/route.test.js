import { POST } from "../route";
import scenarios from "../../../../components/Writing/scenarios";
import { describe, it, expect } from "vitest";

describe("POST /api/ai", () => {
    it("should save a user and return 201 response", async () => {
        const newMessage = {
            role: "user",
            parts: [{ text: scenarios.airport.initialUserPrompt }],
            date: new Date(),
        };
        const body = {
            history: [newMessage],
            systemInstruction: scenarios.airport.systemInstruction,
        }
        const request = new Request("http://localhost/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const response = await POST(request);
        const json = await response.json();
        
        
        expect(response.status).toBe(200);
        expect(typeof json.data.response).toBe("string")
    })
});