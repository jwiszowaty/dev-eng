import { describe, it, expect } from "vitest";
import { POST, GET, PUT, DELETE } from "../route";
import { NextRequest } from "next/server";

describe("POST /api/vocabulary", () => {
    it("should return 201 status", async () => {
        const body = {
            userId: "USERID",
            word: new Date.now(),
            difficulty: 0
        };
        const request = new Request("http://localhost/api/vocabulary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const response = await POST(request);
        expect(response.status).toBe(201)
    },20000)
})

describe("GET /api/vocabulary", () => {
    it("should return 200 status", async () => {
        const request = new NextRequest("http://localhost/api/vocabulary?userId=USERID")
        const response = await GET(request);
        expect(response.status).toBe(200)
    }, 20000)
    it("should return an array", async () => {
        const request = new NextRequest("http://localhost/api/vocabulary?userId=USERID")
        const response = await GET(request);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
    }, 20000)
})

describe("UPDATE /api/vocabulary", () => {
    it("should return 200 status", async () => {
        const body = {
            userId: "USERID",
            word: "test",
            difficulty: 1
        };
        const request = new Request("http://localhost/api/vocabulary", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const response = await PUT(request);
        expect(response.status).toBe(200)
    },20000)
})

describe("DELETE /api/vocabulary", () => {
    it("should return 200 status", async () => {
        const body = {
            userId: "USERID",
            word: "test"
        };
        const request = new Request("http://localhost/api/vocabulary", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const response = await DELETE(request);
        expect(response.status).toBe(200)
    }, 20000)
})