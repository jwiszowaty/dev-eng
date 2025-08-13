import Word from '../Word.jsx';

export default function Pronouns() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🧠 Pronouns – Replacing Nouns")}
      </div>

      <div className="mb-4">
        {wrapText("Pronouns are words that replace nouns to avoid repetition and make sentences smoother. They can stand in for people, objects, and even ideas.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("👤 Subject Pronouns")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Used as the subject of a sentence: I, you, he, she, it, we, they.")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("🎯 Object Pronouns")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Used as the object in a sentence: me, you, him, her, it, us, them.")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("🛠️ Possessive & Reflexive Pronouns")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Possessive: mine, yours, his, hers, ours, theirs.")}</li>
        <li>{wrapText("Reflexive: myself, yourself, himself, herself, itself, ourselves, themselves.")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples:")}
      </div>
      {[ 
        ["He likes football.", "'He' is a subject pronoun replacing a boy/man."],
        ["I saw her at the station.", "'Her' is an object pronoun."],
        ["That book is mine.", "'Mine' shows possession."],
        ["She made it herself.", "'Herself' reflects back to the subject."]
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
        {wrapText("Pronouns help keep your sentences short and clear. Just be sure the reader knows who or what each pronoun refers to!")}
      </div>
    </div>
  );
}
