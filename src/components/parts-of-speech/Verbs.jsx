import Word from '../Word.jsx';

export default function Verbs() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🧠 Verbs – Action and Beyond")}
      </div>

      <div className="mb-4">
        {wrapText("Verbs are words that describe actions, states, or occurrences. Every sentence needs a verb – it's the engine that moves the meaning.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("🏃 Action Verbs")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("These show what someone or something does: run, eat, make, speak.")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("🧩 Auxiliary (Helping) Verbs")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Used with main verbs to create tenses: be, have, do.")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("🎛️ Modal Verbs")}</div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Express possibility, ability, necessity, etc.: can, could, must, should, will.")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples:")}
      </div>
      {[ 
        ["She sings beautifully.", "'Sings' is an action verb."],
        ["They are watching a movie.", "'Are' is an auxiliary helping the main verb 'watching'."],
        ["You must finish your homework.", "'Must' is a modal verb showing necessity."]
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
        {wrapText("Learn to recognize not only what a verb says but also how it's used – is it showing action, helping another verb, or changing the meaning?")}
      </div>
    </div>
  );
}
