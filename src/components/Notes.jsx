import { useEffect, useState } from "react";
import Note from "./Note";
import { fetchAndDisplay, fetchDocs } from "@/app/func";
import { useAuth } from "@/contexts/AuthContext";
export default function Notes() {
  const [ids, setIds] = useState(null);
  const [docDisplayed, setDocDisplayed] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  useEffect(() => {
    if (!user.uid) return null;
    fetchDocs(setIds, setDocDisplayed, setLoading, user);
  }, [user]);
  return (
    <div className="flex flex-col">
      <p>Notes</p>
      {!ids && <p>Loading</p>}
      <div className="flex flex-row">
        <div className="flex flex-col w-2/6">
          {ids &&
            ids.map((id) => (
              <button
                key={id.id}
                onClick={() => fetchAndDisplay(id, setLoading, setDocDisplayed)}
              >
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
