import { connectDB, Document } from "../../../models/mongoDB.js";

export async function findDoc(userId, documentId) {
    console.log("findDoc: ", userId);
    let doc;
    await connectDB();
    doc = await Document.findOne({ userId, documentId }).exec();
    if (!doc) {
        doc = await fetch(`${process.env.BASE_URL || "http://localhost:3000"}/api/google-doc?documentId=${documentId}`)
            .then((res) => res.json())
            .then((data) => {
                return createDoc(userId, documentId, data.name, data.html);
            })
            .catch((error) => console.error("Failed to fetch doc:", error));
    }
    return doc;
}

export async function createDoc(userId, documentId, name, html) {
    console.log("createDoc: ", "userId=", userId, ", documentId=", documentId);
    await connectDB();
    const newDoc = new Document({ userId, documentId, name, html })
    return await newDoc.save();
}
