import Word from '../Word.jsx';

export default function Conjunctions() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🧠 Conjunctions – Joining Words Together")}
      </div>

      <div className="mb-4">
        {wrapText("Conjunctions connect words, phrases, or clauses. They help ideas flow logically and clearly in writing and speech.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("🔗 Coordinating Conjunctions")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("for, and, nor, but, or, yet, so (FANBOYS) – connect words or groups of equal value.")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("🪢 Subordinating Conjunctions")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("because, although, if, when, while, since – connect a dependent clause to a main one.")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples:")}
      </div>
      {[ 
        ["I wanted to go, but it was raining.", "'But' connects two ideas of equal importance."],
        ["She stayed home because she was tired.", "'Because' shows a reason and introduces a dependent clause."],
        ["You can have tea or coffee.", "'Or' gives a choice."]
      ].map(([sentence, explanation], index) => (
        <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4">
          <div>
            <strong>{wrapText(`"${sentence}"`)}</strong>
            <br />➡ {wrapText(explanation)}
          </div>
        </div>
      ))}

      <div className="text-2xl font-semibold text-green-900 mt-10 mb-4">
        {wrapText("🎯 Final Tip")}
      </div>
      <div className="mb-10">
        {wrapText("Good conjunction use helps your writing feel connected and logical. Try combining short sentences using FANBOYS or subordinators!")}
      </div>
    </div>
  );
}
