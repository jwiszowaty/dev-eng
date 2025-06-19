import { useEffect, useState } from "react";
import Note from "./Note";
import { getDocIds } from "@/app/func";
import { useAuth } from "@/contexts/AuthContext";
export default function Notes() {
  const [ids, setIds] = useState(null);
  const [docDisplayed, setDocDisplayed] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  async function showDoc(document) {
    setLoading(true);
    const docId = document.id;
    const name = document.name;
    setDocDisplayed({ docId, name });
    const doc = await fetch(`/api/doc?userId=${user.uid}&documentId=${docId}`)
      .then((res) => res.json());
    setDocDisplayed({ docId, name, html: doc.html });
    setLoading(false);
  }

  useEffect(() => {
    if (user?.uid) {
      getDocIds(setIds, setDocDisplayed, setLoading, user.uid);
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
