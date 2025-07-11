import { describe, expect, it } from "vitest";
import { POST } from "../route";

describe("reporting an issue", () => {
    it("should return status 201", async () => {
        const request = new Request("http://localhost/api/issue", {
            method: "POST",
            body: JSON.stringify({ userEmail: "test@test.com", issueMessage: "test"}),
            headers: { "Content-Type": "application/json" }
        });
        const response = await POST(request);

        expect(response.status).toBe(201)
    }, 30000)
})