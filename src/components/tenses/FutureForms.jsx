import Word from '../Word.jsx';

export default function FutureForms() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="flex flex-col mt-10 w-2/3 items-start">
      <div className="text-3xl font-bold text-black mb-6">
        {wrapText("🔮 Talking About the Future in English")}
      </div>

      <div className="mb-4">
        {wrapText("English has several ways to express the future, depending on intention, prediction, or arrangement. The most common are: 'will', 'going to', and Present Continuous.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
        {wrapText("📌 Will")}
      </div>
      <div className="mb-2">
        {wrapText("Use 'will' for decisions made at the moment of speaking, promises, or predictions.")}
      </div>
      <div className="mb-4 italic">
        {wrapText("I think it will rain tomorrow.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
        {wrapText("🗓️ Going to")}
      </div>
      <div className="mb-2">
        {wrapText("Use 'going to' for plans or intentions decided before speaking, or when there's evidence something will happen.")}
      </div>
      <div className="mb-4 italic">
        {wrapText("She’s going to study medicine.")}
      </div>

      <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
        {wrapText("📅 Present Continuous for Future")}
      </div>
      <div className="mb-2">
        {wrapText("Use Present Continuous for fixed arrangements with a specific time or date.")}
      </div>
      <div className="mb-4 italic">
        {wrapText("We’re meeting the teacher at 10 a.m.")}
      </div>

      <div className="text-xl font-semibold text-green-500 mb-2">
        {wrapText("💡 Compare the Use:")}
      </div>
      <ul className="list-disc list-inside mb-6">
        <li>{wrapText("I’ll call you later. → decision now")}</li>
        <li>{wrapText("I’m going to visit grandma. → planned action")}</li>
        <li>{wrapText("I’m flying to Rome next week. → confirmed schedule")}</li>
      </ul>

      <div className="text-2xl font-semibold text-green-900 mb-4">
        {wrapText("🎯 Final Tip")}
      </div>
      <div className="mb-10">
        {wrapText("Think about intention and timing. Use 'will' for spontaneous or uncertain futures, 'going to' for plans, and Present Continuous for arrangements.")}
      </div>
    </div>
  );
}