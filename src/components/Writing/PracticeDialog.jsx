import { marked } from "marked";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import {sendMessage} from "../funcs";
import scenarios from "./scenarios";
export default function PracticeDialog() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState(null);
  const [situation, setSituation] = useState(null);
  const [systemInstruction, setSystemInstruction] = useState(null);
  const [task, setTask] = useState(null);
  const scrollRef = useRef(null);

  function requestFeedback() {
    startChat("feedback");
    setHistory([]);
    setSituation(null);
    setSystemInstruction(null);
    setMessage(null);
    setTask(null);
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    console.log("Current history:", history);
  }, [history]);

  const startChat = (scenario) => {

    switch (scenario) {
      case "restaurant":
        setSituation("IN A RESTAURANT");
        break;
      case "airport":
        setSituation("AT AN AIRPORT");
        break;

      case "hospital":
        setSituation("IN A HOSPITAL");
        break;
      case "feedback":
        setSituation("FEEDBACK");
        break;
    }

    setSystemInstruction(scenarios[scenario].systemInstruction);
    setHistory([]);
    sendMessage(scenarios[scenario].initialUserPrompt, [], setHistory, scenarios[scenario].systemInstruction, setTask);
  };

  return (
    <div className="flex flex-col items-center p-4 w-1/1">
      <div className="flex justify-center items-center gap-10 h-20">
        {situation ?? "CHOOSE A SCENARIO"}
        {history.length > 0 && (
          <button
            className="border rounded px-4 h-8"
            onClick={() => requestFeedback()}
          >
            end chat
          </button>
        )}
      </div>
      
      {history.length === 0 && (
        <div className="flex gap-x-4 my-4">
          <button
            onClick={() => startChat("airport")}
            className="rounded border px-4"
          >
            Airport
          </button>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex flex-col items-center mt-4 pt-30 pb-5 border-b-2 bg-gradient-to-t from-gray-200 to-white max-w-[1500px] w-9/10 h-[500px] overflow-y-scroll"
      >
        {history.map((messageItem, index) => {
          
          const isUser = messageItem.role === "user";
          return (
            <div
              key={messageItem.date.toISOString() + index}
              className={`flex w-4/5 ${
                isUser ? "justify-end" : "justify-start"
              } my-2`}
            >
              <div
                className={`flex flex-col w-4/5 ${
                  isUser ? "items-end" : "items-start"
                }`}
              >
                <strong>{isUser ? "You" : "Mery"}</strong>
                <div
                  className={`rounded max-w-4/5 p-4 align-middle ${
                    isUser ? "bg-blue-200" : "bg-green-200"
                    }`}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(messageItem.parts[0].text)) }}
                >
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {task && (
        <div className="mt-4">
          <pre>{task}</pre>
        </div>
      )}
      {(history.length > 0 && situation !== "FEEDBACK") && (
        <form
          className="mt-4 max-w-[1500px] w-9/10 flex justify-between gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (message) {
              sendMessage(message, history, setHistory, systemInstruction, setTask);
              setMessage("");
            }
          }}
        >
          <input
            className="border rounded flex w-1/1 h-20 px-2"
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" className="border rounded w-1/5">
            📤 Send
          </button>
        </form>
      )}
    </div>
  );
}
