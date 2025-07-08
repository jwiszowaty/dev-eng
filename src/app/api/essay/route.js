export async function POST(request) {
  const { systemInstruction, data } = await request.json(); // `data` = essay text

  const tools = [
    {
    type: "function",
    function: {
      name: "check_essay",
      description: "Evaluates an ESL essay and returns the full essay in HTML. Incorrect words or phrases are bolded, and hovering over them reveals a detailed tooltip with grammar/vocabulary explanation and suggestions. The tooltip is styled using Tailwind CSS and positioned using absolute utility classes. The HTML is safe to inject via dangerouslySetInnerHTML.",
      parameters: {
        type: "object",
        properties: {
          html: {
            type: "string",
            description: "TailwindCSS-styled HTML string of the essay with errors bolded and hoverable explanations shown in floating tooltips.",
          },
        },
        required: ["html"]
      }
    }
  },
    // {
    //   type: "function",
    //   function: {
    //     name: "check_essay",
    //     description: "Analyzes an English essay and returns structured feedback on grammar, coherence, vocabulary, and suggestions for improvement.",
    //     parameters: {
    //       type: "object",
    //       properties: {
    //         grammar: { type: "string", description: "Feedback on grammar issues." },
    //         coherence: { type: "string", description: "Structure and coherence feedback." },
    //         vocabulary: { type: "string", description: "Evaluation of vocabulary use." },
    //         suggestions: { type: "string", description: "Suggestions for improvement based on sentences/vocabulary from the essay." },
    //         score: { type: "number", description: "Overall score from 1 to 10." }
    //       },
    //       required: ["grammar", "coherence", "vocabulary", "suggestions", "score"]
    //     }
    //   }
    // }
  ];
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
        model: "gpt-4o",
        temperature: 1.0,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: data }
        ],
        tools,
        tool_choice: {
          type: "function",
          function: { name: "check_essay" }
        }
      })
    });
    clearTimeout(timeout);

    const json = await response.json();
    const toolCall = json.choices?.[0]?.message?.tool_calls?.[0];
    const parsed = toolCall ? JSON.parse(toolCall.function.arguments) : null;

    return Response.json({ success: true, data: parsed || json }, { status: 200 });

  } catch (err) {
    console.error("API Route Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
