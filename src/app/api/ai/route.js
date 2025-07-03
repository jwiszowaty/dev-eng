export async function POST(request) {
  const { history, message, systemInstruction } = await request.json();

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
        temperature: 0.9,
      })
    });

    const data = await response.json();
    let reply = data.choices[0]?.message?.content || "I didn't understand that.";
      console.log(reply);
      let parsedResponse;
reply = reply.replace(/```json|\n|```|\\/g,'')
      try {
          parsedResponse = JSON.parse(reply);
      } catch {
          parsedResponse = { response: reply, task: "" };
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