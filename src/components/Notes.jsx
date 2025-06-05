import { useEffect, useState } from "react";
import { CollapsibleDoc } from "./CollapsibleDoc";
import Note from "./Note"
export default function Notes() {
  const [docs, setDocs] = useState(null);
  const [ids, setIds] = useState(null);
  const [docId, setDocId] = useState(ids?.[0].id ?? null)
  const rootFolderId = "1dpBw79arFFZuHYajuPqvvOcF3HdAY_1Z";
  async function fetchDocIds(folderId) {
    try {
      await fetch(
        `http://localhost:3000/api/export-docsAll?rootFolderId=${folderId}`
      )
        .then((response) => response.json())
        .then((data) => setIds(data));
    } catch (error) {
      console.error("error ", error.message);
    }
  }
  async function fetchDoc(documentId) {
    try {
      const res = await fetch(`/api/export-doc?documentId=${documentId}`);
      if (!res.ok) {
        const error = await res.text();
        console.error(`Error fetching doc ${documentId}:`, error);
        return undefined;
      }
      const { html, title } = await res.json();
      setDocs([])
      return <CollapsibleDoc key={index} content={html} title={title} />;
    } catch (err) {
      console.error(`Exception fetching doc ${documentId}:`, err);
      return undefined;
    }
  }
  async function fetchAndDisplay(documentId) {
    setDocId(documentId)
    await fetchDoc(docId)
      .then((response) => response.json())
      .then((data) => {
        if (!docs.docId) {
          fetchDoc(docId)
        }
        setDocs([...docs, data]);
      });
  }
  useEffect(() => {
    fetchDocIds(rootFolderId);
  }, []);
  return (
    <div className="flex flex-col">
      <p>Notes</p>
      {!ids && <p>Loading</p>}
      <div className="flex flex-row">
        <div className="flex flex-col">
          {ids &&
            ids.map((id) => (
              <button key={id.id} onClick={() => fetchAndDisplay(id.id)}>
                {id.name}
              </button>
            ))}
        </div>
          <Note html={docs?.documentId ?? "not found"} />
      </div>
    </div>
  );
}
