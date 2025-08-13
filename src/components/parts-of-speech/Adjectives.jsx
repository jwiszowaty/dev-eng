import Word from '../Word.jsx';

export default function Adjectives() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🧠 Adjectives – Describing Words")}
      </div>

      <div className="mb-4">
        {wrapText("Adjectives describe nouns or pronouns. They give us more information about size, color, shape, quality, quantity, and more.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("📏 Degrees of Comparison")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Positive: big, fast, happy – just describes.")}</li>
        <li>{wrapText("Comparative: bigger, faster, happier – compares two things.")}</li>
        <li>{wrapText("Superlative: biggest, fastest, happiest – compares three or more.")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples:")}
      </div>
      {[ 
        ["She has a red car.", "'Red' describes the noun 'car'."],
        ["This cake is sweeter than that one.", "'Sweeter' is a comparative adjective."],
        ["That was the most exciting movie.", "'Most exciting' is a superlative adjective phrase."]
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
        {wrapText("Adjectives make your language more vivid and detailed. Use them to show differences, qualities, and comparisons clearly!")}
      </div>
    </div>
  );
}
