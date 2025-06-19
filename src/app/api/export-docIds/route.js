import { google } from "googleapis";

export async function GET(request) {
  const rootFolderId = request.nextUrl.searchParams.get("rootFolderId")
  if (!rootFolderId) {
    return new Response(JSON.stringify({ error: "rootFolderId is required" }), {
      status: 400,
    });
  }
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.SERVICE_FILE_PATH, // JSON key file of service account
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  const drive = google.drive({ version: "v3", auth });

  const allDocs = [];

  async function walkFolder(folderId) {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType)",
    });

    const files = res.data.files || [];

    for (const file of files) {
      if (file.mimeType === "application/vnd.google-apps.folder") {
        // It's a folder → recurse
        await walkFolder(file.id);
      } else if (file.mimeType === "application/vnd.google-apps.document") {
        // It's a Google Doc → store
        allDocs.push(file);
      }
    }
  }

  // You can shape the response as you like. Example: only IDs
  try {
    await walkFolder(rootFolderId);

    return new Response(JSON.stringify(allDocs), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
