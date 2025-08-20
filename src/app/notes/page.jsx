"use client";
import { useEffect, useState } from "react";
import Note from "@/components/Note.jsx";
import { useAuth } from "@/contexts/AuthContext";
import { uploadDocs } from "@/app/api/uploadDocs";
import useNetworkStatus from "@/app/hooks/useNetworkStatus";
import { useRouter } from "next/navigation";
import FunFacts from "@/components/FunFacts";
import NavBar from "@/components/NavBar";
import Link from "next/link";
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
  
  return (
    <div className="flex flex-col">
      <NavBar/>
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
