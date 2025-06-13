export async function fetchAndDisplay(document, setLoading, setDocDisplayed) {
    setLoading(true);
    const id = document.id;
    const name = document.name;
    setDocDisplayed({ id, name });
    console.log("fetchAndDisplay: document to display updated: ", {
        id,
        name,
    });
    const html = await fetchDoc(id);
    setDocDisplayed({ id, name, html });
    setTimeout(() => {
        setLoading(false);
    }, 200);
}
export async function postDoc(document) {
    await fetch("/api/doc", {
        method: "POST",
        body: JSON.stringify({ ...document }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("error: ", error))
}
export async function fetchDoc(documentId) {
    const userEmail = localStorage.getItem("dev-eng-userEmail")
    try {
        const res = await fetch(`/api/doc?documentId=${documentId}`, { method: "GET" });
        if (!res.ok) {
            const error = await res.text();
            console.error(`Error fetching doc ${documentId}:`, error);
            return;
        }
        const { name, html } = await res.json();
        console.log("fetchDoc: document html fetched for: ", name);
        const document = { userEmail, documentId, name, html };
        postDoc(document);
        return html;
    } catch (err) {
        console.error(`Exception fetching doc ${documentId}:`, err);
    }
}
export async function postUser(user) {
    try {
        console.log("Posting user...");
        
        const userId = user.uid
        const response = await fetch('/api/user', {
            method: "POST",
            body: JSON.stringify({userId})
        })
        const userData = response.json();
        return userData;
    } catch (error) {
        console.error(`Exception posting user ${user.uid}:`, error);
    }
}
export async function getUser(user) {
    try {
        const response = await fetch(`/api/user?userId=${user.uid}`, { method: "GET" })
        let userData = await response.json();
        if (userData == null) {
            userData = await postUser(user);
        }
        return userData;
    } catch (error) {
        console.error("error: ", error);
    }
}
export async function fetchDocs(setIds, setDocDisplayed, setLoading, user) {
    try {
        await user;
        const userData = await getUser(user);
        const folderId = userData.folderId;
        console.log("fetchDocs: documents ids are being set!");
        const response = await fetch(
            `http://localhost:3000/api/export-docsAll?rootFolderId=${folderId}`
        );
        const data = await response.json();
        const firstDoc = data[0];
        setIds(data);
        console.log("fetchDocs: documents ids set!");
        console.log("fetchDocs: first document is being fetched");
        const html = await fetchDoc(firstDoc.id);
        setDocDisplayed({ ...firstDoc, html });
        console.log("fetchDocs: the first document to display set: ", {
            ...firstDoc,
            html,
        });
        await fetchDoc(firstDoc.id);
        setLoading(false);
    } catch (error) {
        console.error("error ", error.message);
    }
}