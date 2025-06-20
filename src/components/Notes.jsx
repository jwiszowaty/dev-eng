import { useEffect, useState } from "react";
import Note from "./Note";
import { useAuth } from "@/contexts/AuthContext";
import { uploadDocs } from "../app/api/uploadDocs";
import useNetworkStatus from "@/app/hooks/useNetworkStatus";
export default function Notes() {
  const { isOnline } = useNetworkStatus();
  const [ids, setIds] = useState(null);
  const [docDisplayed, setDocDisplayed] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState([]);
  
  async function showDoc({ documentId, name }) {
    setLoading(true);
    let doc;
    const userId = currentUser.uid;
    setDocDisplayed({ documentId, name });
    doc = documents.find((document) => document.id == documentId);
    if (!doc) {
      doc = await fetch(`/api/google-doc?documentId=${documentId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((error) => console.error("error document user: ", error));
      const document = {
        userId,
        documentId,
        name,
        html: doc.html,
      };
      setDocuments(...documents, document)
    }
    setDocDisplayed({ documentId, name, html: doc.data?.html ?? doc.html });
    setLoading(false);
  }

  useEffect(() => {
    console.log("isOnline? ",isOnline);
    
    if (isOnline && currentUser?.uid) {
      (async function () {
        const user = await fetch(`/api/user?userId=${currentUser.uid}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .catch((error) => console.error("error fetching user: ", error));
        if (!user?.success) {
          console.error("API error:", user.error);
          return;
        }
        setDocuments(user.data.documents)
        const folderId = await user.data.folderId;
        const docIds = await fetch(
          `/api/export-docIds?rootFolderId=${folderId}`
        )
          .then((res) => res.json())
          .catch((error) =>
            console.error("error fetching document IDs: ", error)
          );
        const firstDoc = docIds[0];
        setIds(docIds);
        showDoc({documentId: firstDoc.id, name: firstDoc.name});
        setLoading(false);
        await uploadDocs(docIds, currentUser.uid, documents, setDocuments);
        console.log(documents, "documents after uploadDocs");
      })();
    }
  }, [isOnline, currentUser]);
  if (!currentUser) return <p>wait</p>;
  return (
    <div className="flex flex-col">
      <p>Notes</p>
      {!ids && <p>Loading</p>}
      <div className="flex flex-row">
        <div className="flex flex-col w-2/6">
          {ids &&
            ids.map((doc) => (
              <button key={doc.id} onClick={() => showDoc({documentId: doc.id, name: doc.name})}>
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
