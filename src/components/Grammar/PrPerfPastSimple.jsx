import Word from '../Word.jsx';

export default function PrPerfPastSimple() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("Present Perfect vs Past Simple – What's the Difference?")}
      </div>

      <div className="mb-4">
        {wrapText(
          "These two tenses can be tricky because they both talk about the past. But they have different uses and meanings. Let's break it down with clear rules and examples."
        )}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("✅ When do you use the Present Perfect?")}
      </div>
      <div className="mb-2">{wrapText("Use it to talk about:")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Unspecified time in the past")}</li>
        <li>{wrapText("Life experiences")}</li>
        <li>{wrapText("Recent events with impact now")}</li>
        <li>{wrapText("Actions that started in the past and continue now")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples with explanations:")}
      </div>
      {[ 
        ["I have visited Paris.", "We don’t say when — it’s an experience in life."],
        ["She has lost her keys.", "She doesn’t have them now — result in the present."],
        ["They have lived here since 2010.", "They started in 2010 and still live here."],
      ].map(([sentence, explanation], index) => (
        <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4">
          <div>
            <strong>{wrapText(`"${sentence}"`)}</strong>
            <br />➡ {wrapText(explanation)}
          </div>
        </div>
      ))}

      <div className="text-xl font-semibold mt-6 mb-2">
        {wrapText("🧱 Structure (Quick Reminder):")}
      </div>
      <ul className="list-disc list-inside mb-6">
        <li>
          ➕ <code className="bg-gray-100 px-1 rounded">{wrapText("I have eaten")}</code>
          , <code className="bg-gray-100 px-1 rounded">{wrapText("She has gone")}</code>
        </li>
        <li>
          ➖ <code className="bg-gray-100 px-1 rounded">{wrapText("I haven’t eaten")}</code>
          , <code className="bg-gray-100 px-1 rounded">{wrapText("He hasn’t gone")}</code>
        </li>
        <li>
          ❓ <code className="bg-gray-100 px-1 rounded">{wrapText("Have you eaten?")}</code>
          , <code className="bg-gray-100 px-1 rounded">{wrapText("Has she gone?")}</code>
        </li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-10 mb-4">
        {wrapText("⏳ When do you use the Past Simple?")}
      </div>
      <div className="mb-2">{wrapText("Use it when:")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("The action is finished")}</li>
        <li>{wrapText("You say when it happened (yesterday, in 2015, etc.)")}</li>
        <li>{wrapText("It’s a sequence of past events")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples with explanations:")}
      </div>
      {[ 
        ["I saw that movie last week.", "It happened at a specific time in the past."],
        ["She finished the report yesterday.", "The time is clear and it’s over."],
        ["They went to the shop and bought milk.", "Two completed actions in a sequence."],
      ].map(([sentence, explanation], index) => (
        <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4">
          <div>
            <strong>{wrapText(`"${sentence}"`)}</strong>
            <br />➡ {wrapText(explanation)}
          </div>
        </div>
      ))}

      <div className="text-xl font-semibold mt-6 mb-2">
        {wrapText("🧱 Structure:")}
      </div>
      <ul className="list-disc list-inside mb-6">
        <li>
          ➕ <code className="bg-gray-100 px-1 rounded">{wrapText("I ate")}</code>
          , <code className="bg-gray-100 px-1 rounded">{wrapText("He went")}</code>
        </li>
        <li>
          ➖ <code className="bg-gray-100 px-1 rounded">{wrapText("I didn’t eat")}</code>
          , <code className="bg-gray-100 px-1 rounded">{wrapText("She didn’t go")}</code>
        </li>
        <li>
          ❓ <code className="bg-gray-100 px-1 rounded">{wrapText("Did you eat?")}</code>
          , <code className="bg-gray-100 px-1 rounded">{wrapText("Did he go?")}</code>
        </li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-10 mb-4">
        {wrapText("🆚 Compare Them Side by Side")}
      </div>
      <div className="overflow-visible">
        <table className="table-auto w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {["Situation", "Present Perfect", "Past Simple", "Why?"].map((text, i) => (
                <th key={i} className="border px-4 py-2">
                  {wrapText(text)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Life experience", "I have eaten sushi.", "–", "No specific time mentioned."],
              ["Specific time", "–", "I ate sushi last night.", "The time is clear."],
              ["Result now", "She has broken her leg.", "–", "The result affects the present."],
              ["Sequence of actions", "–", "He entered the room, sat down, and started speaking.", "Past actions in order."],
              ["Ongoing situation", "We have lived here for 10 years.", "–", "It started in the past and continues now."],
            ].map((row, i) => (
              <tr key={i} className={i % 2 ? "bg-gray-50" : ""}>
                {row.map((cell, j) => (
                  <td key={j} className="border px-4 py-2">
                    {wrapText(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-10 mb-4">
        {wrapText("🎯 Final Tip")}
      </div>
      <div className="mb-2">
        {wrapText("Ask yourself before choosing:")}
      </div>
      <ul className="list-disc list-inside mb-10">
        <li>
          <strong>{wrapText("Do I care when it happened?")}</strong> → {wrapText("Use")}{" "}
          <span className="font-semibold text-green-700">{wrapText("Past Simple")}</span>
        </li>
        <li>
          <strong>{wrapText("Is the result important now?")}</strong> → {wrapText("Use")}{" "}
          <span className="font-semibold text-green-700">{wrapText("Present Perfect")}</span>
        </li>
      </ul>
    </div>
  );
}
