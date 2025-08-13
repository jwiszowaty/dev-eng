import { Essay, connectDB } from "../../../models/mongoDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, text, aiFeedback, feedback } = body;
        await connectDB();
        const newEssay = await Essay({userId, text, aiFeedback, feedback})
        const savedEssay = await newEssay.save();
        return NextResponse.json(savedEssay, { status: 201 })
    } catch (error) {
        console.error("Error submitting the essay:", error);
        return NextResponse.json({ error: "Failed to submit the essay" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const userId = await request.nextUrl.searchParams.get("id")
        await connectDB();
        const essays = await Essay.find({userId}).exec();
        return Response.json({ success: true, data: essays }, { status: 200 });
    } catch (error) {
        console.error("Error fetching the essay:", error);
        return NextResponse.json({ error: "Failed to fetch the essay" }, { status: 500 });
    }
}