import { useEffect, useState } from "react";
import Note from "./Note";
import { useAuth } from "@/contexts/AuthContext";
import { uploadDocs } from "../../uploadDocs";
export default function Notes() {
  const [ids, setIds] = useState(null);
  const [docDisplayed, setDocDisplayed] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  async function showDoc(document) {
    setLoading(true);
    let doc;
    const docId = document.id;
    const name = document.name;
    setDocDisplayed({ docId, name });
    doc = await fetch(`/api/doc?userId=${user.uid}&documentId=${docId}`)
      .then((res) => res.json())
    if (doc.error == "Document not found") {
      doc = await fetch(`/api/google-doc?documentId=${docId}`, {method: "GET"})
            .then((res) => res.json())
        .then((data) => {
                return data;
            })
        .catch((error) => console.error("error document user: ", error));
      const document = {userId: user.uid, documentId: docId, name: doc.name, html: doc.html}
      await fetch(`/api/doc`, {
        method: "POST",
        body: JSON.stringify(document)
      })
    }
    setDocDisplayed({ docId, name, html: doc.data?.html?? doc.html });
    setLoading(false);
  }

  useEffect(() => {
    if (user?.uid) {
      (async function () {
      const userData = await fetch(`/api/user?userId=${user.uid}`, { method: "GET" })
            .then((res) => res.json())
            .catch((error) => console.error("error fetching user: ", error));
        const folderId = await userData.data.folderId;
        const docIds = await fetch(`/api/export-docIds?rootFolderId=${folderId}`)
        .then((res) => res.json())
        .catch((error) => console.error("error fetching document IDs: ", error));
      const firstDoc = docIds[0];
        setIds(docIds);
        showDoc(firstDoc)
        setLoading(false);
        await uploadDocs(docIds, user.uid)
    })()
    }
  }, [user]);
  if (!user) return <p>wait</p>;
  return (
    <div className="flex flex-col">
      <p>Notes</p>
      {!ids && <p>Loading</p>}
      <div className="flex flex-row">
        <div className="flex flex-col w-2/6">
          {ids &&
            ids.map((doc) => (
              <button key={doc.id} onClick={() => showDoc(doc)}>
                {doc.name}
              </button>
            ))}
        </div>
        <Note
          loading={loading}
          html={docDisplayed?.html ?? ""}
          name={docDisplayed?.name ?? ""}
        />
      </div>
    </div>
  );
}
