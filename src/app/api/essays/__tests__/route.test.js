import { describe, expect, it } from "vitest";
import { GET, POST } from "../route";
import { NextRequest } from "next/server";

describe("POST api/essays", () => {
    it("should return 201 status", async () => {
        const essay = `My trip started on the 20th september. This is the first day of my holiday.  The First day was planned for only travel to Sapporo because total time travel lasted for 18 hours. I had bought two tickets for my flight. The first ticket of my flight included a trip in both directions from Wrocław to Warsaw because the main ticket was Warsaw to Sapporo via Pekin. The first day started just early because I had to get up at 5 o’clock. The first flight was at 8:45 AM and lasted for only 50 minutes. When I prepared to travel I ordered a taxi to Airport. I drove to the airport at 6:45 and dropped off my luggage on the desk in the airport. Next time I went to a security check and I was shocked because I didn't have individual control as is often the case. When I was in the departure hall then I went to a coffee restaurant because in the morning I always drink a minimum of three coffees every day because I like this drink. When I drank my coffee I went by airplane. The airplane was very good but a little old but the first segment flight was very short. I flyied to Warsaw at 10:00 o clock. I had to pick-up and drop off again but I had a lot of time. Next time I went to passport control because the next flight was outside europe. The second flight was very long because it lasted for 10 hours and started at 13:30 local time.  I was very sad because the airplane did not have a charging port for the phone. In my opinion the aeroplane was old. During the flight I was sleeping for about 5 hours and I watched my favourite series. The Pekin I flew at about 5:40 AM local time. I had two hours to rest from sitting. At the Airport in Pekin I had to pass the check to get to my next gate. During the inspection  I had a problem because in my backpack was hand sanitizer. The guard security took me this gel and took a photo off my passport. I was afraid that I would have problems entering China when I came back from my holiday. Next my flight was very good and short. I was at 12:30 local time in Sapporo. When I was in the airport my first dream was to go to sleep because I was very tired. `;
        const body = {
            userId: "USERID",
            text: essay,
            aiFeedback: "AI FEEDBACK",
        }
        const request = new Request("http://localhost/api/essays", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const response = await POST(request);
        const json = await response.json();

        expect(response.status).toBe(201);
    }, 20000)
})
describe("GET api/essays?id=", () => {
    it("should return 200 status", async () => {
        const request = new NextRequest("http://localhost/api/essays?id=USERID", {
            method: "GET"
        });
        const response = await GET(request);
        const json = await response.json();

        expect(response.status).toBe(200);
    }, 20000)
})