import { useEffect, useState } from "react";
import Note from "./Note";
import LZString from "lz-string";
import { useAuth } from "@/contexts/AuthContext";
export default function Notes() {
  const { user } = useAuth();
  const [docs, setDocs] = useState({});
  const [ids, setIds] = useState(null);
  const [docDisplayed, setDocDisplayed] = useState(null);
  const [loading, setLoading] = useState(true);
  const rootFolderId = "1dpBw79arFFZuHYajuPqvvOcF3HdAY_1Z";

  async function fetchDocIds(folderId) {
    try {
      console.log("fetchDocIds: documents ids are being set!");
      const response = await fetch(
        `http://localhost:3000/api/export-docsAll?rootFolderId=${folderId}`
      );
      const data = await response.json();
      const firstDoc = data[0];
      setIds(data);
      console.log("fetchDocIds: documents ids set!");
      console.log("fetchDocIds: first document is being fetched");
      const html = await getDoc(firstDoc.id);
      setDocDisplayed({ ...firstDoc, html });
      console.log("fetchDocIds: the first document to display set: ", {
        ...firstDoc,
        html,
      });
      await getDoc(firstDoc.id);
      setLoading(false);
    } catch (error) {
      console.error("error ", error.message);
    }
  }
  async function getDoc(documentId) {
    const cached = localStorage.getItem(`doc-${documentId}`);
    if (cached) {
      console.log("getDoc: loaded from cache:", documentId);
      console.log(cached);
      const parsed = JSON.parse(LZString.decompressFromUTF16(cached));
      return parsed.html;
    }
    try {
      const res = await fetch(`/api/export-doc?documentId=${documentId}`);
      if (!res.ok) {
        const error = await res.text();
        console.error(`Error fetching doc ${documentId}:`, error);
        return;
      }
      const { name, html } = await res.json();
      console.log("fetchDoc: document html fetched for: ", docData.title);
      const document = {
        user,
        documentId,
        name,
        html,
      };
      const mongoRes = await fetch("/api/post-doc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      });
      console.log(mongoRes);
      return docData.html;
    } catch (err) {
      console.error(`Exception fetching doc ${documentId}:`, err);
    }
  }
  async function fetchAndDisplay(document) {
    setLoading(true);
    const id = document.id;
    const name = document.name;
    setDocDisplayed({ id, name });
    console.log("fetchAndDisplay: document to display updated: ", {
      id,
      name,
    });
    const html = await getDoc(id);
    setDocDisplayed({ id, name, html });
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }
  useEffect(() => {
    fetchDocIds(rootFolderId);
  }, []);
  // useEffect(() => {
  //   if (ids && docs) {
  //     (async function () {
  //       for (const id of ids) {
  //         if (!localStorage.getItem(`doc-${id}`)) {
  //           setTimeout(async () => {await getDoc(id.id)},1000)
  //         } else {
  //           console.log(`document ${id} available in localStorage`);
  //         }
  //       }
  //     })();
  //   }
  // }, []);
  return (
    <div className="flex flex-col">
      <p>Notes</p>
      {!ids && <p>Loading</p>}
      <div className="flex flex-row">
        <div className="flex flex-col w-2/6">
          {ids &&
            ids.map((id) => (
              <button key={id.id} onClick={() => fetchAndDisplay(id)}>
                {id.name}
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
