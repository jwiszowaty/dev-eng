export async function getDocIds(setIds, setDocDisplayed, setLoading, userId) {
    try {
        const user = await fetch(`/api/user?userId=${userId}`, { method: "GET" })
            .then((res) => res.json())
            .catch((error) => console.error("error fetching user: ", error));
        const folderId = await user.data.folderId;
        
        const docIds = await fetch(`/api/export-docIds?rootFolderId=${folderId}`)
        .then((res) => res.json())
        .catch((error) => console.error("error fetching document IDs: ", error));
        const firstDoc = docIds[0];
        setIds(docIds);
        const html = await fetch(`/api/doc?userId=${userId}&documentId=${firstDoc.id}`, {method: "GET"})
            .then((res) => res.json())
            .then((data) => {
                return data.data.html;
            })
            .catch((error) => console.error("error document user: ", error));
        setDocDisplayed({ ...firstDoc, html });
        setLoading(false);
    } catch (error) {
        console.error("error ", error.message);
    }
}