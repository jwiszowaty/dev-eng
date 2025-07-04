export async function POST(request) {
  const { history, systemInstruction } = await request.json();
  const tools = [
    {
      type: "function",
      function: {
        name: "airport_response",
        description: "Simulates an in-character airport employee named Mery who responds to the user's message with a task and essential info for English practice.",
        parameters: {
          type: "object",
          properties: {
            response: {
              type: "string",
              description: "Mery's short, realistic airport employee response in English (under 35 words)."
            },
            task: {
              type: "string",
              description: "A specific instruction in Polish for the student to respond to the prompt."
            },
            essentialInfo: {
              type: "object",
              description: "Relevant fictional info the student needs to use in their answer.",
              additionalProperties: {
                type: "string"
              }
            }
          },
          required: ["response", "task", "essentialInfo"]
        }
      }
    }
  ];

  const messages = [
    { role: "system", content: systemInstruction || "You are a helpful assistant." },
    ...history.map(msg => ({
      role: msg.role,
      content: msg.parts[0].text
    }))
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o", // or "gpt-3.5-turbo"
        messages,
        temperature: 1.0,
      }),
      tools,
      tool_choice: {
        type: "function",
        function: { name: "airport_response" }
      }
    });

    const data = await response.json();
    let reply = data.choices[0]?.message?.content || "I didn't understand that.";
    // reply = reply.replace(/```json\n|\n|```/g, '').replace(/"/g, "'"); // Clean up the reply to ensure it's valid JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(reply);
    } catch {
      parsedResponse = { response: reply, task: "", essentialInfo: {} };
    }
    return Response.json({ success: true, data: parsedResponse }, { status: 200 });
  } catch (err) {
    console.error("API Route Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// export async function POST(request) {
//     try {
//         const body = await request.json();
//         const { history, message, systemInstruction } = body;
//         const ai = new GoogleGenAI({});
//         const config = {
//             maxOutputTokens: 100,
//             temperature: 0.5,
//             topP: 0.7,
//             systemInstruction,
//         };
//         const chat = ai.chats.create({
//             model: "gemini-1.5-pro-latest",
//             contents: history,
//             config,
//         });

//         const response = await chat.sendMessage({ message });
//         const parsedResponse = JSON.parse(response.text);
//         console.log("parsedResponse: ", parsedResponse);

//         return Response.json({ success: true, data: parsedResponse }, { status: 200 });
//     } catch (error) {
//         console.error("error: ", error);
//         return Response.json({ success: false, error: error.message });
//     }
// }