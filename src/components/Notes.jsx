import { useEffect, useState } from "react";

export default function Notes() {
  const [doc, setDoc] = useState(null);
  const docIds = [
    "1NLZJOANA6pKNGXDqffh-LBFV0iLDwlXJGoSnoNRjs5k",
    "1ejy7cffD3gk7BUiMk2_96_PJd7FW5FwaOh7cfWSr31U",
  ];
  async function fetchDoc(documentId) {
    try {
      const res = await fetch(`/api/export-doc?documentId=${documentId}`);
      if (!res.ok) {
        const error = await res.text();
        console.error(`Error fetching doc ${documentId}:`, error);
        return undefined;
      }
      const html = await res.text();
      return html;
    } catch (err) {
      console.error(`Exception fetching doc ${documentId}:`, err);
      return undefined;
    }
  }
  useEffect(() => {
    const loadedDocs = [];
    async function fetchDocs() {
      for await (const docId of docIds) {
        const data = await fetchDoc(docId);

        loadedDocs.push(data);
      }
      setDoc(loadedDocs)
    }
    fetchDocs();
  }, []);
  return (
    <>
      <p>Notes</p>
      {doc && doc.map(({html, title}) => {
        return (
          <div>
            <p>{title}</p>
            <div className="max-w-3xl mx-auto p-4" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        )
      })}
    </>
  );
}
