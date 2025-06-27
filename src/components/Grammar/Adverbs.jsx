import Word from '../Word.jsx';

export default function Adverbs() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🧠 Adverbs – Modifying Everything")}
      </div>

      <div className="mb-4">
        {wrapText("Adverbs add detail to verbs, adjectives, or other adverbs. They explain how, when, where, and to what extent something happens.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("🕓 Adverbs of Frequency")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Tell how often something happens: always, usually, sometimes, never.")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("🕺 Adverbs of Manner")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Explain how an action is done: quickly, carefully, loudly.")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("📏 Adverbs of Degree")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Show intensity or extent: very, quite, too, almost.")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples:")}
      </div>
      {[ 
        ["She often goes to the gym.", "'Often' shows frequency."],
        ["He drives carefully.", "'Carefully' shows manner – how he drives."],
        ["I’m almost finished.", "'Almost' shows the degree of completion."]
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
        {wrapText("Adverbs make actions and descriptions more precise. Watch where you place them in a sentence – it can change the meaning!")}
      </div>
    </div>
  );
}
