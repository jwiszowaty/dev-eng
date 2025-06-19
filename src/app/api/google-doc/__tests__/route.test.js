import { describe, it, expect } from "vitest";
import { GET } from "../route";
import { NextRequest } from "next/server";

describe("GET /api/google-doc?documentId=", () => {
    it("should find the document and return 200 response", async () => {
        // process.env.SERVICE_FILE_PATH =  "/Users/jakubwiszowaty/personal-projects/dev-eng/service-account.json"; 
        const url = new URL("http://localhost/api/google-doc?documentId=1HpRAVM4o11OdB0WMqPcCeSdgTm9b7XBBUi0vOLcippY");
        const request = new NextRequest(url);
        const response = await GET(request);
        const json = await response.json();
        
        expect(response.status).toBe(200);
        expect(json).toHaveProperty("name");
        expect(json).toHaveProperty("html");
    })
})