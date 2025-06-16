import { createDoc, findDoc } from "@/services/docService.js";

export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const documentId = request.nextUrl.searchParams.get("documentId");

    const doc = await findDoc(userId, documentId)

    return Response.json({ success: true, data: doc }, { status: 200 })
  } catch (error) {
    console.error("error: ", error);
    return Response.json({ success: false, error: error.message });
  }
}


export async function POST(request) {
  try {
    const { userId, documentId, name, html } = await request.json();;

    const newDoc = await createDoc(userId, documentId, name, html);
    
    return Response.json({ success: true, data: newDoc }, { status: 201 })
  } catch (error) {
    console.error("Saving document failed: ", error);
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}