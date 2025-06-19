import { MongoMemoryServer } from "mongodb-memory-server";
import { default as mongoose } from "mongoose";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { GET, POST } from "../route";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    process.env.MONGO_URI = uri;
    await mongoose.connect(uri);
}, 30000)

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
})

describe("POST /api/user", () => {
    it("should save a user and return 201 response", async () => {
        const request = new Request("http://localhost/api/user", {
            method: "POST",
            body: JSON.stringify({ userId: "PnMJ5PtCvlX6DPXBrKzexee3rcz1" }),
            headers: { "Content-Type": "application/json" }
        });

        const response = await POST(request);
        const json = await response.json();
        expect(response.status).toBe(201);
        expect(json.success).toBe(true);
        expect(json.data.userId).toBe('PnMJ5PtCvlX6DPXBrKzexee3rcz1')
    })
})
describe("GET /api/user?userId=PnMJ5PtCvlX6DPXBrKzexee3rcz1", () => {
    it("should find the user and return 200 response", async () => {
        const request = new Request("http://localhost/api/user?userId=test-user-123", {
            method: "GET"
        })
        const response = await GET(request);
        const json = await response.json();
        expect(response.status).toBe(200)
        expect(json.success).toBe(true)
        expect(json.data.userId).toBe("test-user-123")
    })
})