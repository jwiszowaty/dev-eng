import scenarios from "@/components/Writing/scenarios";

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


      const replyText = data?.data.response ?? data?.data ?? "Sorry, I didn't catch that.";

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
export async function sendEssay(essay) {
  const body = {
    data: essay,
    systemInstruction: scenarios.essay2.systemInstruction,
  }
  try {
    const response = await fetch("/api/essay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const replyText = data?.data?.html ?? data?.data ?? "Try again";

    return replyText;
  } catch (error) {
    console.error("Error fetching AI response:", error);
  }
}
export async function uploadEssay(userId, title, text) {
  try {
    const aiFeedback = "AI-generated feedback will be available soon.";
    const feedback = "Personal feedback will be available soon.";
    const body = { userId, title, text, aiFeedback, feedback }
    await fetch("/api/essays", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  } catch (error) {
    console.error("Error uploading essay:", error);
  }
}