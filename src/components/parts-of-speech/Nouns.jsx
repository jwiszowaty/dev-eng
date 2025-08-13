import Word from '../Word.jsx';

export default function Nouns() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🧠 Nouns – The Naming Words")}
      </div>

      <div className="mb-4">
        {wrapText("Nouns are words that name people, places, things, or ideas. They are one of the most basic building blocks of the English language.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("📌 Common vs Proper Nouns")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Common nouns are general: cat, city, idea.")}</li>
        <li>{wrapText("Proper nouns name specific things: Felix, London, Buddhism. They start with a capital letter.")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("📏 Countable vs Uncountable Nouns")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Countable nouns can be counted: one apple, two books.")}</li>
        <li>{wrapText("Uncountable nouns can’t be counted individually: water, information, rice.")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples:")}
      </div>
      {[ 
        ["I saw a dog in the park.", "'Dog' is a common, countable noun."],
        ["London is a busy city.", "'London' is a proper noun."],
        ["We need more rice.", "'Rice' is an uncountable noun."],
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
        {wrapText("If it names something, it’s probably a noun! Pay attention to whether it’s specific or general, and whether you can count it.")}
      </div>
    </div>
  );
}
