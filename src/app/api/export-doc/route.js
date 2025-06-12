import { google } from "googleapis";
export async function GET(request) {
    try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.SERVICE_FILE_PATH,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });
    const documentId = request.nextUrl.searchParams.get("documentId");

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

    return new Response(JSON.stringify({name, html}), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
