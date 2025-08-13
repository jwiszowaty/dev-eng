import Word from '../Word.jsx';

export default function Prepositions() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🧠 Prepositions – Relating Words")}
      </div>

      <div className="mb-4">
        {wrapText("Prepositions link nouns or pronouns to other words in a sentence. They show relationships like time, place, and direction.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("🕒 Prepositions of Time")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("at, on, in – used for specific times, days, and longer periods.")}</li>
        <li>{wrapText("since, for – show duration of time.")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("📍 Prepositions of Place")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("in, on, at – describe location.")}</li>
        <li>{wrapText("under, over, between – describe spatial relationships.")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("➡️ Prepositions of Direction")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("to, into, onto – indicate movement toward something.")}</li>
        <li>{wrapText("from, off, out of – indicate movement away.")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples:")}
      </div>
      {[ 
        ["He arrived at 6 PM.", "'At' shows a specific time."],
        ["The keys are on the table.", "'On' tells us where the keys are."],
        ["She walked into the room.", "'Into' shows direction or movement."]
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
        {wrapText("Prepositions can be tricky – they often don’t translate directly from one language to another. The best way to learn them is through lots of practice and exposure.")}
      </div>
    </div>
  );
}
