export async function POST(request) {
  const { history = null, systemInstruction, data = null} = await request.json();
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
    },
    {
      type: "function",
      function: {
        name: "check_essay",
        description: "Analyzes an English essay and returns structured feedback on grammar, coherence, vocabulary, and suggestions for improvement.",
        parameters: {
          type: "object",
          properties: {
            grammar: {
              type: "string",
              description: "Feedback on grammar issues found in the essay."
            },
            coherence: {
              type: "string",
              description: "Feedback on how logically structured and coherent the essay is."
            },
            vocabulary: {
              type: "string",
              description: "Evaluation of vocabulary use and appropriateness."
            },
            suggestions: {
              type: "string",
              description: "Specific suggestions for improvement."
            },
            score: {
              type: "number",
              description: "Overall score from 1 to 10 based on quality and correctness."
            }
          },
          required: ["grammar", "coherence", "vocabulary", "suggestions", "score"]
        }
      }
    }
  ];
  let messages;
  if (history) {
    messages = [
      { role: "system", content: systemInstruction || "You are a helpful assistant." },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.parts[0].text
      }))
    ];
  } else {
    messages = data;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 600000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      signal: controller.signal,
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
      tool_choice: "auto",
    });

    clearTimeout(timeout);
    
    const data = await response.json();
    console.log(data);
    
    let reply = data.choices[0]?.message?.content || "I didn't understand that.";
    // reply = reply.replace(/```json\n|\n|```/g, '').replace(/"/g, "'"); // Clean up the reply to ensure it's valid JSON
    let parsedResponse;
    console.log(JSON.stringify(reply));


    try {
      parsedResponse = JSON.parse(reply);
    } catch {
      try {
        reply.replaceAll('"', "'")
        parsedResponse = JSON.parse(reply);
      } catch {
        parsedResponse = reply;
      }
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