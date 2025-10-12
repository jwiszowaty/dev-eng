import { findEssays, updateEssay } from "@/server/controllers/essaysController";
import { Essay } from "@/server/models/essay";
import { connectDB } from "@/server/models/mongoDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, title, text, aiFeedback, feedback } = body;
        await connectDB();
        const newEssay = await Essay({ userId, title, text, aiFeedback, feedback })
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
        const essays = await findEssays(userId);
        return NextResponse.json({ success: true, data: essays }, { status: 200 });
    } catch (error) {
        console.error("Error fetching the essay:", error);
        return NextResponse.json({ error: "Failed to fetch the essay" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const updatedEssay = await updateEssay(body);
        return NextResponse.json(updatedEssay, { status: 200 });
    } catch (error) {
        console.error("Error updating the essay:", error);
        return NextResponse.json({ error: "Failed to update the essay" }, { status: 500 });
    }
}