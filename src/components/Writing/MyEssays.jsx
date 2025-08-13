import { useEffect, useState } from "react";
import { sendEssay, uploadEssay } from "../funcs";
import { useAuth } from "@/contexts/AuthContext";

export default function MyEssays() {
  const [essaySubmission, setEssaySubmission] = useState(false);
  const [essay, setEssay] = useState("");
  const [aiFeedback, setAiFeedback] = useState("aifeed");
  const [essays, setEssays] = useState([]);
  const { currentUser } = useAuth();
  async function submitEssay() {
    await uploadEssay(currentUser.uid, essay, aiFeedback);
    setEssaySubmission(false);
    setEssay("");
  }
  useEffect(() => {
    if (currentUser?.uid) {
      (async function () {
        const essays = await fetch(`/api/essay-db?id=${currentUser.uid}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .catch((error) => console.error("error fetching essays: ", error));
        setEssays(essays.data);
      })();
    }
  }, [currentUser, essay]);
  return (
    <div>
      <button onClick={() => setEssaySubmission(true)} className="border p-2">
        Submit an essay
      </button>
      <div
        className={`w-[500px] bg-orange-400 ${
          essaySubmission ? "visible" : "hidden"
        }`}
      >
        <form
          className="m-10 max-w-[1500px] w-9/10 flex justify-between gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            submitEssay();
          }}
        >
          <textarea
            className="border rounded flex w-1/1 h-50 px-2"
            value={essay || ""}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" className="border rounded w-1/5 h-20">
            📤 Send
          </button>
        </form>
      </div>
      <div>
        <p>essays</p>
        {essays && essays.map((essay) => {
          return (
            <div>
              <div><p>{essay.text}</p></div>
              <div><p>{essay.aiFeedback}</p></div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
