import Word from "../Word.jsx";
export default function PastSimpleCont() {
  const vocab = [];
  const wrapText = (text) =>
    text.split(/(\s+)/).map((part, i) =>
      /\s+|^\W$|\d/u.test(part) ? (
        part
      ) : (
        <Word key={i} vocab={vocab}>
          {part}
        </Word>
      )
    );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("Past Simple vs Past Continuous – What’s the Difference?")}
      </div>
      <div className="mb-4">
        {wrapText(
          "Let’s explore the difference between Past Simple and Past Continuous. These two tenses often confuse learners, but each has clear rules and uses."
        )}
      </div>
      <div className="flex">
        <img className="overflow-clip h-45 mb-4" src="past.webp" />
<div className="flex  flex-col ml-4">
        <div className="text-2xl font-semibold text-green-900 mb-4">
          {wrapText("✅ When do you use the Past Simple?")}
        </div>
        <div className="mb-2">{wrapText("Use it for actions that:")}</div>
        <ul className="list-disc list-inside mb-4">
          <li>{wrapText("Happened once in the past")}</li>
          <li>{wrapText("Are finished")}</li>
          <li>{wrapText("Happened in sequence")}</li>
          <li>
            {wrapText("Include time markers (yesterday, last year, etc.)")}
          </li>
                  </ul>
                  </div>
      </div>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples with explanations:")}
      </div>
      {[
        [
          "I watched a movie yesterday.",
          "The action is finished and has a past time marker.",
        ],
        ["She studied French in college.", "It’s a completed past action."],
        [
          "They went to the park and played football.",
          "Two past actions in sequence.",
        ],
      ].map(([sentence, explanation], index) => (
        <div
          key={index}
          className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4"
        >
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
          ➕{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("I walked")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("He played")}
          </code>
        </li>
        <li>
          ➖{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("I didn’t walk")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("She didn’t play")}
          </code>
        </li>
        <li>
          ❓{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("Did you walk?")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("Did he play?")}
          </code>
        </li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-10 mb-4">
        {wrapText("🔄 When do you use the Past Continuous?")}
      </div>
      <div className="mb-2">{wrapText("Use it to describe:")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Actions happening at a specific time in the past")}</li>
        <li>{wrapText("Interrupted past actions")}</li>
        <li>{wrapText("Background descriptions in stories")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples with explanations:")}
      </div>
      {[
        [
          "I was watching TV at 8 p.m.",
          "The action was in progress at that moment.",
        ],
        [
          "She was cooking when I arrived.",
          "Cooking was interrupted by another action.",
        ],
        [
          "It was raining and the wind was blowing.",
          "Describes the scene in the past.",
        ],
      ].map(([sentence, explanation], index) => (
        <div
          key={index}
          className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4"
        >
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
          ➕{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("I was eating")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("They were working")}
          </code>
        </li>
        <li>
          ➖{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("I wasn’t eating")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("He wasn’t working")}
          </code>
        </li>
        <li>
          ❓{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("Were you eating?")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("Was she working?")}
          </code>
        </li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-10 mb-4">
        {wrapText("🆚 Compare Them Side by Side")}
      </div>
      <div className="overflow-visible">
        <table className="table-auto w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {["Situation", "Past Simple", "Past Continuous", "Why?"].map(
                (text, i) => (
                  <th key={i} className="border px-4 py-2">
                    {wrapText(text)}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Completed action",
                "I finished the report.",
                "–",
                "Past action is complete.",
              ],
              [
                "Action in progress",
                "–",
                "I was finishing the report.",
                "Focus is on the process.",
              ],
              [
                "Interrupted action",
                "She called.",
                "I was sleeping.",
                "One action interrupts another.",
              ],
              [
                "Story background",
                "–",
                "The birds were singing.",
                "Setting the scene.",
              ],
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
        {wrapText("To choose the correct tense, ask:")}
      </div>
      <ul className="list-disc list-inside mb-10">
        <li>
          <strong>{wrapText("Is it a finished action?")}</strong> →{" "}
          {wrapText("Use")}{" "}
          <span className="font-semibold text-green-700">
            {wrapText("Past Simple")}
          </span>
        </li>
        <li>
          <strong>{wrapText("Was it in progress or interrupted?")}</strong> →{" "}
          {wrapText("Use")}{" "}
          <span className="font-semibold text-green-700">
            {wrapText("Past Continuous")}
          </span>
        </li>
      </ul>
    </div>
  );
}
