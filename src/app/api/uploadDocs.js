export async function uploadDocs(docIds, userId, documents, setDocuments) {
    console.log(documents, "documents in uploadDocs");

    const documentsToUpdate = [...documents];
    let newDocsAdded = false;
    await Promise.all(
        docIds.map(async ({ id, name, mimeType }) => {
            const documentExists = documents.find(doc => doc.documentId === id);
            if (!documentExists) {
                const response = await fetch(`/api/google-doc?documentId=${id}`, {
                    method: "GET",
                });
                const data = await response.json();
                const document = {
                    userId,
                    documentId: id,
                    name: name,
                    html: data.html,
                };
                const res = await fetch("/api/doc", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(document),
                });
                const savedDoc = await res.json();
                documentsToUpdate.push(savedDoc);
                newDocsAdded = true;
            }
        })
    );
    if (newDocsAdded) {
        await fetch("/api/user", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, documents: documentsToUpdate }),
        });
        setDocuments(prevDocs =>
            Array.isArray(prevDocs) ? [...prevDocs, ...documentsToUpdate] : [documentsToUpdate]
        );
    }
}