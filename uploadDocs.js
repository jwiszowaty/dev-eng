export async function uploadDocs(docIds, userId) {
    docIds.forEach(async (doc) => { 
        const document = {
            userId,
            documentId: doc.id,
            name: doc.name,
            html: null,
        };
        const fetchedDoc = await fetch(`/api/doc?userId=${userId}&documentId=${doc.id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error fetching document: ", error));
        if (!fetchedDoc.success){
            await fetch(`/api/google-doc?documentId=${doc.id}`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    document.html = data.html;
                })
                .catch((error) => console.error("Error fetching Google Doc: ", error));
            await fetch(`/api/doc`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(document)
            });
        }
    });
}