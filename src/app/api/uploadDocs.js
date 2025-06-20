export async function uploadDocs(docIds, userId, documents, setDocuments) {
    const documentsToUpdate = [];
    const docIdsLimited = [...docIds].slice(0, 10); // Limit to 10 documents
    docIdsLimited.forEach(async ({ id, name, mimeType }, index) => {
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
                body: JSON.stringify({
                    userId,
                    documentId: id,
                    name,
                    html: data.html,
                }),
            });
            const savedDoc = await res.json();
            documentsToUpdate.push(savedDoc);
        }
    });
    await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, documents: documentsToUpdate }),
    });
    setDocuments(prevDocs => Array.isArray(prevDocs) ? [...prevDocs, ...documentsToUpdate] : [documentsToUpdate]);
}