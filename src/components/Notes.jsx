import { useEffect, useState } from "react";
import Note from "./Note";
import { useAuth } from "@/contexts/AuthContext";
import { uploadDocs } from "../app/api/uploadDocs";
import useNetworkStatus from "@/app/hooks/useNetworkStatus";
import { useRouter } from "next/navigation";
import FunFacts from "./FunFacts";
export default function Notes() {
  const router = useRouter();
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

    doc =
      documents.length > 0
        ? documents.find((document) => document.documentId == documentId)
        : undefined;
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
      setDocuments((prevDocs) =>
        Array.isArray(prevDocs) ? [...prevDocs, document] : [document]
      );
    }
    setDocDisplayed({ documentId, name, html: doc.data?.html ?? doc.html });
    setLoading(false);
  }

  useEffect(() => {
    if (isOnline && currentUser?.uid) {
      (async function () {
        const user = await fetch(`/api/user?userId=${currentUser.uid}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .catch((error) => console.error("error fetching user: ", error));
        if (!user?.success) {
          console.error("API error:", user.error);
          router.push("/new-user");
          return;
        }
        setDocuments(user.data.documents);
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
        let doc;
        const userId = currentUser.uid;
        setDocDisplayed({ documentId: firstDoc.id, name: firstDoc.name });
        doc =
          user.data.documents.length > 0
            ? user.data.documents.find(
                (document) => document.documentId == firstDoc.id
              )
            : undefined;
        if (!doc) {
          doc = await fetch(`/api/google-doc?documentId=${firstDoc.id}`, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              return data;
            })
            .catch((error) => console.error("error document user: ", error));
          const document = {
            userId,
            documentId: firstDoc.id,
            name: firstDoc.name,
            html: doc.html,
          };
          setDocuments((prevDocs) =>
            Array.isArray(prevDocs) ? [...prevDocs, document] : [document]
          );
        }
        setDocDisplayed({
          documentId: firstDoc.id,
          name: firstDoc.name,
          html: doc.data?.html ?? doc.html,
        });
        setLoading(false);
        await uploadDocs(
          docIds,
          currentUser.uid,
          user.data.documents,
          setDocuments
        );
      })();
    }
  }, [isOnline, currentUser]);
  if (!currentUser) return <p>wait</p>;
  if (loading)
    return (
      <div className="flex flex-col items-center m-5 gap-5">
        <div className="flex gap-5 items-center">
          <p className="text-4xl">Loading</p>
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
          </div>
        <FunFacts />
      </div>
    );
  return (
    <div className="flex flex-col">
      {!ids && <p>Loading</p>}
      <div className="flex flex-row">
        <div className="flex flex-col w-2/6 items-center">
          <p className="text-2xl">Notes</p>
          {ids &&
            ids.map((doc) => (
              <button
                className={docDisplayed.documentId == doc.id ? "font-bold" : ""}
                key={doc.id}
                onClick={() => showDoc({ documentId: doc.id, name: doc.name })}
              >
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
