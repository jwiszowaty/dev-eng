import { useEffect, useState } from "react";

export default function Notes() {
  const [doc, setDoc] = useState(null);
  const docIds = [
    "1NLZJOANA6pKNGXDqffh-LBFV0iLDwlXJGoSnoNRjs5k",
    "1ejy7cffD3gk7BUiMk2_96_PJd7FW5FwaOh7cfWSr31U",
  ];
  const docs = [];
  async function fetchDoc(documentId) {
    const res = await fetch(`/api/google-doc?documentId=${documentId}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error("Failed to fetch doc");
    }
  }
  useEffect(() => {
    async function fetchDocs() {
      for await (const docId of docIds) {
        const data = await fetchDoc(docId);
        docs.push(data);
      }
      console.log(docs);
      setDoc(docs);
    }
    fetchDocs();
  }, []);
  return (
    <>
      <p>Notes</p>
      {doc &&
        doc.map((doc, index) => {
          return (
            <>
              <p key={index}>{doc.title || "not found"}</p>
              {doc.body.content.map((block) => {
                if (
                  block.paragraph &&
                  Array.isArray(block.paragraph.elements)
                ) {
                  for (const element of block.paragraph.elements) {
                    if (element.textRun && element.textRun.content) {
                      return (
                        <p>
                          {element.textRun.content}
                        </p>
                      );
                    }
                  }
                }
              })}
            </>
          );
        })}
    </>
  );
}
