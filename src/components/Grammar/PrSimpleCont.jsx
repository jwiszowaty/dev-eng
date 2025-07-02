import Word from '../Word.jsx';
export default function PrSimpleCont() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText(
          "Present Simple vs Present Continuous – What’s the Difference?"
        )}
      </div>
      <div className="mb-4">
        {wrapText(
          "Hi! Let’s take a closer look at two very common English tenses: Present Simple and Present Continuous. As a Polish learner, it’s normal if you sometimes mix them up — English uses two tenses where Polish often uses just one. But don’t worry — I’ll explain everything clearly, with examples and reasons why."
        )}
      </div>
      <div className="flex">
        <img className="overflow-clip h-50 mb-4" src="present.jpg" alt="clock on a bench in a park"/>
<div className="flex  flex-col ml-4">
      <div className="text-2xl font-semibold text-green-900 mb-4">
        {wrapText("✅ When do you use the Present Simple?")}
      </div>
      <div className="mb-2">{wrapText("Use it to describe things that are:")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Regular")}</li>
        <li>{wrapText("Repeated")}</li>
        <li>{wrapText("Facts")}</li>
        <li>{wrapText("Permanent")}</li>
        <li>{wrapText("Not changing quickly")}</li>
          </ul>
          </div>
</div>
      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples with explanations:")}
      </div>
      {[
        [
          "I go to school every day.",
          "You do this regularly — it’s a routine, so you use Present Simple.",
        ],
        [
          "She drinks tea in the morning.",
          "This is her habit — it happens often, not just once.",
        ],
        [
          "The sun rises in the east.",
          "This is a scientific fact — it never changes.",
        ],
        [
          "You like music.",
          "This is a feeling or opinion — it’s a long-term state.",
        ],
        [
          "They have a dog.",
          "Having a pet is not a short activity — it’s a more permanent situation.",
        ],
        [
          "The train leaves at 8:00.",
          "This is a timetable or schedule — even if it’s in the future, we use Present Simple.",
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
          <code className="bg-gray-100 px-1 rounded">{wrapText("I play")}</code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("He watches")}
          </code>
        </li>
        <li>
          ➖{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("I don’t play")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("She doesn’t work")}
          </code>
        </li>
        <li>
          ❓{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("Do you play?")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("Does he work?")}
          </code>
        </li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-10 mb-4">
        {wrapText("🔄 When do you use the Present Continuous?")}
      </div>
      <div className="mb-2">{wrapText("Use it to describe:")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Actions happening right now")}</li>
        <li>{wrapText("Temporary situations")}</li>
        <li>{wrapText("Things that are changing")}</li>
        <li>{wrapText('Annoying habits (with "always")')}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples with explanations:")}
      </div>
      {[
        [
          "I’m reading this explanation right now.",
          "It’s happening in this moment — Present Continuous is perfect here.",
        ],
        [
          "You’re learning English!",
          "This is something you’re doing now, or over a short period — not forever.",
        ],
        [
          "This week I’m staying at my cousin’s place.",
          "This isn’t your permanent home — it’s a temporary situation.",
        ],
        [
          "More people are learning English online these days.",
          "This is a trend — something that’s changing over time.",
        ],
        [
          "He’s always leaving his dirty socks on the floor!",
          "This is a repeated action that annoys you — we often use Present Continuous with “always” for annoying habits.",
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
            {wrapText("I’m eating")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("She’s working")}
          </code>
        </li>
        <li>
          ➖{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("I’m not eating")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("He isn’t working")}
          </code>
        </li>
        <li>
          ❓{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("Are you eating?")}
          </code>
          ,{" "}
          <code className="bg-gray-100 px-1 rounded">
            {wrapText("Is she working?")}
          </code>
        </li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-10 mb-4">
        {wrapText("🆚 Compare Them Side by Side")}
      </div>
      <div className="overflow-visible">
        <table className="table-auto w-full border border-gray-300 text-sm ">
          <thead className="bg-gray-100 ">
            <tr>
              {[
                "Situation",
                "Present Simple",
                "Present Continuous",
                "Why?",
              ].map((text, i) => (
                <th key={i} className="border px-4 py-2 ">
                  {wrapText(text)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Routine",
                "I eat breakfast at 7 a.m.",
                "–",
                "It’s a regular habit.",
              ],
              [
                "Action now",
                "–",
                "I’m eating breakfast right now.",
                "It’s happening now.",
              ],
              ["Fact", "Water boils at 100°C.", "–", "It’s a scientific fact."],
              [
                "Temporary situation",
                "–",
                "I’m working in London this month.",
                "It’s not permanent.",
              ],
              [
                "Permanent situation",
                "I live in Kraków.",
                "–",
                "Long-term residence.",
              ],
              [
                "Annoying habit",
                "–",
                "He’s always leaving the lights on!",
                "Annoying repeated action.",
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
        {wrapText("Before you choose the tense, ask yourself:")}
      </div>
      <ul className="list-disc list-inside mb-10">
        <li>
          <strong>{wrapText("Do I do this often?")}</strong> → {wrapText("Use")}{" "}
          <span className="font-semibold text-green-700">
            {wrapText("Present Simple")}
          </span>
        </li>
        <li>
          <strong>{wrapText("Is this happening now or just for now?")}</strong>{" "}
          → {wrapText("Use")}{" "}
          <span className="font-semibold text-green-700">
            {wrapText("Present Continuous")}
          </span>
        </li>
      </ul>
      <div className="text-2xl font-semibold text-green-900 mt-10 mb-4">
        {wrapText("📝 Test Your Knowledge")}
      </div>
      <div>
        <div className='font-semibold'>Complete the sentences with correct words in gaps.</div>
        <ol className='flex flex-col *:list-decimal list-inside mt-4 mb-10 gap-y-2'>
          <li>She <input className='bg-gray-200 rounded border-1 border-gray-400'/> (go) to school every morning.</li>
          <li>They <input className='bg-gray-200 rounded border-1 border-gray-400'/> (not like) spicy food.</li>
          <li><input className='bg-gray-200 rounded border-1 border-gray-400'/> he <input className='bg-gray-200 rounded border-1 border-gray-400'/> (work) in an office?</li>
          <li>My brother <input className='bg-gray-200 rounded border-1 border-gray-400'/> (play) football on weekends.</li>
          <li>The sun <input className='bg-gray-200 rounded border-1 border-gray-400'/> (rise) in the east.</li>
          <li>We <input className='bg-gray-200 rounded border-1 border-gray-400'/> (not watch) TV in the evening.</li>
          <li><input className='bg-gray-200 rounded border-1 border-gray-400'/> your parents <input className='bg-gray-200 rounded border-1 border-gray-400'/> (live) in this city?</li>
          <li>Cats <input className='bg-gray-200 rounded border-1 border-gray-400'/> (sleep) for many hours a day.</li>
          <li>He <input className='bg-gray-200 rounded border-1 border-gray-400'/> (wash) his car every Sunday.</li>
          <li>She <input className='bg-gray-200 rounded border-1 border-gray-400'/> (not speak) French very well.</li>
        </ol>
      </div>
    </div>
  );
}
