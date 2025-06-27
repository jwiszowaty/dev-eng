import Word from '../Word.jsx';

export default function Conditionals() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🔁 English Conditionals: Zero to Mixed")}
      </div>

      <div className="mb-4">
        {wrapText("Conditionals describe the result of a possible situation. They usually include an 'if' clause (condition) and a main clause (result).")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
        {wrapText("0️⃣ Zero Conditional")}
      </div>
      <div className="mb-2">
        {wrapText("Used for facts or habits: If + present simple, present simple.")}
      </div>
      <div className="mb-4 italic">
        {wrapText("If you heat water, it boils.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
        {wrapText("1️⃣ First Conditional")}
      </div>
      <div className="mb-2">
        {wrapText("Used for real future possibilities: If + present simple, will + base verb.")}
      </div>
      <div className="mb-4 italic">
        {wrapText("If it rains, we’ll stay inside.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
        {wrapText("2️⃣ Second Conditional")}
      </div>
      <div className="mb-2">
        {wrapText("Used for unreal or unlikely situations: If + past simple, would + base verb.")}
      </div>
      <div className="mb-4 italic">
        {wrapText("If I won the lottery, I would travel the world.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
        {wrapText("3️⃣ Third Conditional")}
      </div>
      <div className="mb-2">
        {wrapText("Used for past regrets or impossible situations: If + past perfect, would have + past participle.")}
      </div>
      <div className="mb-4 italic">
        {wrapText("If she had studied, she would have passed the exam.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
        {wrapText("🔀 Mixed Conditionals")}
      </div>
      <div className="mb-2">
        {wrapText("Combines second and third conditionals. They describe a past condition with a present result.")}
      </div>
      <div className="mb-4 italic">
        {wrapText("If I had taken the job, I would be living in New York now.")}
      </div>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Quick Summary:")}
      </div>
      <ul className="list-disc list-inside mb-6">
        <li>{wrapText("0️⃣ Zero – facts, always true")}</li>
        <li>{wrapText("1️⃣ First – real future possibility")}</li>
        <li>{wrapText("2️⃣ Second – unreal present or future")}</li>
        <li>{wrapText("3️⃣ Third – unreal past")}</li>
        <li>{wrapText("🔀 Mixed – past condition, present result")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mb-4">
        {wrapText("🎯 Final Tip")}
      </div>
      <div className="mb-10">
        {wrapText("Mastering conditionals helps express cause, effect, dreams, regrets, and possibilities clearly. Practice them in real-life situations!")}
      </div>
    </div>
  );
}
