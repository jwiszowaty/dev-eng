export async function sendMessage(messageToSend, history, setHistory, systemInstruction, setTask, situation, setData) {
  const newMessage = {
    role: "user",
    parts: [{ text: messageToSend }],
    date: new Date(),
  };

  if (situation === "feedback") {
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: [...history, newMessage],
          systemInstruction,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      
      const replyText = data?.data?.response ?? "data.data";

      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          parts: [{ text: replyText }],
          date: new Date(),
        },
      ]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          parts: [{ text: "Oops! Something went wrong. Please try again." }],
          date: new Date(),
        },
      ]);
    }

  } else {
    setHistory((prev) => [...prev, newMessage]);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: [...history, newMessage],
          systemInstruction,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.data);


      const replyText = data?.data.response ?? "Sorry, no response.";

      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          parts: [{ text: replyText }],
          date: new Date(),
        },
      ]);
      setData(data.data.essentialInfo)
      setTask(data.data.task);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          parts: [{ text: "Oops! Something went wrong. Please try again." }],
          date: new Date(),
        },
      ]);
    }
  }
}
