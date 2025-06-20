import { connectDB, Document } from "@/models/mongoDB";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const documentId = request.nextUrl.searchParams.get("documentId");
    await connectDB();
    const doc = await Document.findOne({ userId, documentId }).exec();
    if (!doc) {
      return Response.json({ success: false, error: "Document not found" }, { status: 404 });
    }
    return Response.json({ success: true, data: doc }, { status: 200 });
  } catch (error) {
    console.error("error: ", error);
    return Response.json({ success: false, error: error.message });
  }
}


export async function POST(request) {
   try {
    const body = await request.json();
    const savedDoc = await Document.create(body);
    return NextResponse.json(savedDoc, { status: 200 });
  } catch (error) {
    console.error("Error saving document:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}