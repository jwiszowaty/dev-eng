import { google } from "googleapis";
export async function GET(request) {
    try {
        const documentId = request.nextUrl.searchParams.get("documentId");
        console.log("GET /api/google-doc with documentId:", documentId);
        
        if (!documentId) {
            return new Response(
                JSON.stringify({ error: "documentId is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
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
