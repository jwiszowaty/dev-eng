import { GET } from "../route";
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
describe("GET /api/export-docIds", () => {
    it("should return 400 if rootFolderId is not provided", async () => {
        const url = new URL("http://localhost/api/export-docIds?rootFolderId=");
        const request = new NextRequest(url);
        const response = await GET(request);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json).toHaveProperty("error", "rootFolderId is required");
    });
    it("should return 200 and list of document IDs for valid rootFolderId", async () => {
        // process.env.SERVICE_FILE_PATH =  "/Users/jakubwiszowaty/personal-projects/dev-eng/service-account.json";
        const url = new URL("http://localhost/api/export-docIds?rootFolderId=1HpRAVM4o11OdB0WMqPcCeSdgTm9b7XBBUi0vOLcippY");
        const request = new NextRequest(url);
        const response = await GET(request);
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(json)).toBe(true);
        json.forEach(doc => {
            expect(doc).toHaveProperty("id");
            expect(doc).toHaveProperty("name");
            expect(doc).toHaveProperty("mimeType");
        });
    });
});