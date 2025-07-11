import { NextResponse } from "next/server";
import { connectDB, Issue } from "../../../models/mongoDB";

export async function POST(request) {

    try {
        const body = await request.json();
        const { userEmail, issueMessage } = body;
        
        await connectDB();
        const newIssue = await Issue({ userEmail, issueMessage, status: "new" });
        const savedIssue = await newIssue.save();
        return NextResponse.json(savedIssue, { status: 201 });
    } catch (error) {
        console.error("Error saving issue:", error);
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}