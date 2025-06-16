import { google } from "googleapis";
import { connectDB, Document } from "../models/mongoDB.js";

export async function findDoc(userId, documentId) {
    console.log("findDoc: ", userId);
    
    await connectDB();
    let doc = await Document.findOne({ userId, documentId }).exec();
    if (!doc) {
        doc = await fetchGoogleDoc(documentId);
        return await createDoc(userId, documentId, doc.name, doc.html);
    }
    return doc;
}

export async function createDoc(userId, documentId, name, html) {
    console.log("createDoc: ", "userId=", userId, ", documentId=", documentId);
    
    await connectDB();
    const newDoc = new Document({ userId, documentId, name, html })
    return await newDoc.save();
}
async function fetchGoogleDoc(documentId) {
    console.log("fetchGoogleDoc: ", documentId);
    
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.SERVICE_FILE_PATH,
            scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        });

        const drive = google.drive({ version: "v3", auth });

        const metadataRes = await drive.files.get({
            fileId: documentId,
            fields: "name",
        });
        const name = metadataRes.data.name;

        const result = await drive.files.export(
            {
                fileId: documentId,
                mimeType: "text/html",
            },
            { responseType: "stream" }
        );

        let html = "";
        await new Promise((resolve, reject) => {
            result.data
                .on("data", (chunk) => (html += chunk))
                .on("end", resolve)
                .on("error", reject);
        });

        return new Response(JSON.stringify({ name, html }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}