import { marked } from "marked";
import { useEffect, useRef, useState } from "react";
import wrapText from "../funcs";
import { set } from "mongoose";
export default function PracticeDialog() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState(null);
  const [situation, setSituation] = useState(null);
  const [systemInstruction, setSystemInstruction] = useState(null);
  const scrollRef = useRef(null);
  function requestFeedback() {
    setHistory([]);
    setSituation(null);
    setSystemInstruction(null);
    setMessage(null);
  }
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);
  async function sendMessage(message) {
    const newMessage = {
      role: "user",
      parts: [{ text: message }],
      date: new Date(),
    };
    setHistory((prev) =>
      [newMessage, ...prev].sort((a, b) => new Date(a.date) - new Date(b.date))
    );
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ history, message, systemInstruction }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setHistory((prev) =>
        [
          { role: "model", parts: [{ text: data.data }], date: new Date() },
          ...prev,
        ].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  }
  const startChat = (message) => {
    switch (message) {
      case "restaurant":
        setSituation("IN A RESTAURANT");
        setSystemInstruction(
          "You are a friendly restaurant employee (e.g. waiter or manager) in a London restaurant. Your goal is to help the user practice their English conversation skills in a natural restaurant setting. Always stay in character and guide the interaction just like you would with a real customer. Ask appropriate questions, respond to the user's choices, and adapt the conversation to match the scenario."
        );
        sendMessage(
          "Begin the roleplay as a restaurant employee in a London restaurant. Do not explain or ask what the roleplay is about. Do not mention that this is a roleplay. Assume the user is a customer who has just arrived. Your next message must be in character as the employee — greet the customer, introduce yourself and the restaurant, present the menu, and ask a natural opening question (e.g. if they’d like a drink or are ready to order)."
        );
        break;
      case "airport":
        setSituation("AT AN AIRPORT");
        setSystemInstruction(
          "You are a helpful airport employee (e.g. check-in agent, gate staff, or security officer) at a London airport. Your goal is to help the user practice their English conversation skills in a realistic airport environment. Always stay in character and guide the interaction naturally, just like you would with a real passenger. Ask appropriate questions, respond to the user's answers, and adapt the conversation based on typical airport situations like check-in, security, or boarding."
        );

        sendMessage(
          "Begin the roleplay as an airport employee in a London airport. Do not explain or ask what the roleplay is about. Do not mention that this is a roleplay. Assume the user is a passenger who has just approached you. Your next message must be in character as the employee — greet the passenger, introduce your role if relevant, and ask a realistic first question related to airport procedures (e.g. check-in, baggage, passport check, or boarding)."
        );

        break;
      case "hospital":
        setSituation("IN A HOSPITAL");
        setSystemInstruction(
          "You are a professional and kind hospital employee (e.g. receptionist, nurse, or doctor) in a London hospital. Your goal is to help the user practice their English conversation skills in a realistic hospital setting. Stay fully in character and interact naturally, just like you would with a real patient. Ask relevant questions, respond appropriately to the user's answers, and adapt the conversation to typical hospital situations like check-ins, appointments, symptoms, or treatments."
        );

        sendMessage(
          "Begin the roleplay as a hospital employee in a London hospital. Do not explain or ask what the roleplay is about. Do not mention that this is a roleplay. Assume the user is a patient who has just approached you. Your next message must be in character as the employee — greet the patient, introduce yourself if needed, and ask a realistic first question related to hospital procedures (e.g. appointments, symptoms, check-in, or treatment)."
        );

        break;
    }
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
      {history.length == 0 && (
        <div className="flex gap-x-4 my-4">
          <button
            onClick={() => startChat("restaurant")}
            className="rounded border px-4"
          >
            Restaurant
          </button>
          <button
            onClick={() => startChat("airport")}
            className="rounded border px-4"
          >
            Airport
          </button>
          <button
            onClick={() => startChat("hospital")}
            className="rounded border px-4"
          >
            Hospital
          </button>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex flex-col items-center mt-4 pt-30 pb-5 border-b-2 bg-gradient-to-t from-gray-200 to-white max-w-[1500px] w-9/10 h-[500px] overflow-y-scroll"
      >
        {history.map((message, index) => {
          if (index === 0) return;
          const isUser = message.role === "user";
          return (
            <div
              key={message.parts.text}
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
                >
                  {wrapText(message.parts[0].text.replace(/^"|"$/g, ""))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {history.length > 0 && (
        <form
          className="mt-4 max-w-[1500px] w-9/10 flex justify-between gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(message);
            setMessage("");
          }}
        >
          <input
            className="border rounded flex w-1/1 h-20 px-2"
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="border rounded w-1/5">
            📤 Send
          </button>
        </form>
      )}
    </div>
  );
}
