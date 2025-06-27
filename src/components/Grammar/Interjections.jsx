import Word from '../Word.jsx';

export default function Interjections() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🧠 Interjections – Expressing Emotion Instantly")}
      </div>

      <div className="mb-4">
        {wrapText("Interjections are short words or phrases that show sudden emotion or reaction. They stand alone and are often followed by an exclamation mark.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-8 mb-4">
        {wrapText("💬 Common Interjections")}
      </div>
      <ul className="list-disc list-inside mb-4">
        <li>{wrapText("Surprise: Wow! Oh!")}</li>
        <li>{wrapText("Happiness: Yay! Hooray!")}</li>
        <li>{wrapText("Pain: Ouch! Ow!")}</li>
        <li>{wrapText("Confusion: Huh? Eh?")}</li>
        <li>{wrapText("Disapproval: Ugh! Yuck!")}</li>
      </ul>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Examples:")}
      </div>
      {[ 
        ["Wow! That’s amazing!", "'Wow' expresses surprise or amazement."],
        ["Ouch! That hurt!", "'Ouch' is used to show pain."],
        ["Yay! We won the game!", "'Yay' expresses happiness or excitement."]
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
        {wrapText("Use interjections to add personality or emotion to speech and writing—but use them sparingly in formal writing.")}
      </div>
    </div>
  );
}
