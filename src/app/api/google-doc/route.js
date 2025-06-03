import { google } from "googleapis";
export async function GET(request) {
    try {
        const url = new URL(request.url);
        const documentId = url.searchParams.get("documentId");
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.SERVICE_FILE_PATH,
            scopes: ["https://www.googleapis.com/auth/documents.readonly"],
        });

        const docs = google.docs({ version: "v1", auth });

        const response = await docs.documents.get({ documentId });
        console.log(response.data);
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
