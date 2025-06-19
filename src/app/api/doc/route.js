import { connectDB, Document } from "@/models/mongoDB";

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
    const { userId, documentId, name, html } = await request.json();;
    await connectDB();
    const newDoc = new Document({ userId, documentId, name, html })
    const savedDoc = await newDoc.save();

    return Response.json({ success: true, data: savedDoc }, { status: 201 })
  } catch (error) {
    console.error("Saving document failed: ", error);
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}