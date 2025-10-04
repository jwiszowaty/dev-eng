import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function Report() {
  const [report, setReport] = useState(false);
  const [message, setMessage] = useState("report an issue");
  const [issue, setIssue] = useState(null);
  const [email, setEmail] = useState(null);
  const { currentUser } = useAuth();
  const css = [
    report ? "flex flex-col absolute" : "absolute",
    "bottom-2 left-2",
    "rounded-10",
    "bg-blue-950 text-white",
    "origin-bottom-left",
    "text-sm",
    report ? "font-normal" : "font-semibold",
    "transition-[weight, height, padding] duration-400 ease-in-out",
    report ? "w-100 h-100 px-6 py-3" : "w-fit h-9 px-4 py-2",
  ].join(" ");
  function handleReport() {
    if (!report) {
      setMessage("Describe the issue:");
    }
    setReport(!report);
  }
  async function handleSubmit() {
    setReport(!report);

    const request = await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: currentUser?.email ?? email,
        issueMessage: issue,
        status: "new",
      }),
    });
    if (request.status !== 201) {
      setMessage("Sorry, your report was unsuccessful. Try again later.");
    } else {
      setMessage("Thanks! Your report has been received.");
    }
    setTimeout(() => {
      setMessage("report an issue");
    }, 10000);
  }
  if (report) {
    return (
      <form className={css} onSubmit={handleSubmit}>
        <div className="flex justify-between items-center my-2">
          <p className="text-xl">Describe the issue:</p>
          <button
            onClick={handleReport}
            className="w-10 h-10 self-end justify-center text-3xl rounded-full bg-white text-black"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                fill="#0F1729"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col h-full">
          {!currentUser && (
            <div className="flex my-2 py-2 gap-2 w-full justify-between">
              <p className="w-fit text-nowrap">Your email:</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white w-full h-fit px-2 text-black"
                required
              />
            </div>
          )}
          <textarea
            onChange={(e) => setIssue(e.target.value)}
            className="bg-white w-full h-full text-black p-2"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="p-3 my-2 border-white border-2 w-fit h-fit self-center"
        >
          Send
        </button>
      </form>
    );
  } else {
    return (
      <div onClick={handleReport} className={css}>
        {message}
      </div>
    );
  }
}
