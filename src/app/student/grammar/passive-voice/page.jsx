"use client";
import Word from "../../../../components/Word.jsx";
import NavBar from "@/components/common/NavBar";

export default function PassiveVoice() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="grid grid-cols-[280px_auto] grid-rows-[60px_auto] w-screen h-screen">
      <NavBar />

      <div className="pt-[40px] p-10 max-w-5xl">
        <div className="text-3xl font-bold text-black mb-6">
          {wrapText("🎭 Passive Voice in English")}
        </div>

        <div className="mb-4">
          {wrapText(
            "The passive voice is used when the focus is on the action or the receiver of the action, not the person doing it."
          )}
        </div>

        <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
          {wrapText("🛠️ Structure")}
        </div>
        <ul className="list-disc list-inside mb-4">
          <li>{wrapText("Form: be (in correct tense) + past participle")}</li>
          <li>{wrapText("Optional: by + agent (who did it)")}</li>
        </ul>

        <div className="text-xl font-semibold text-green-500 mb-2">
          {wrapText("💡 Examples:")}
        </div>
        {[
          [
            "The book was written by Orwell.",
            "Focus on the book, not the writer.",
          ],
          [
            "These cars are made in Germany.",
            "Emphasises the origin or process.",
          ],
          ["The cake has been eaten.", "Unknown or unimportant agent."],
        ].map(([sentence, explanation], index) => (
          <div
            key={index}
            className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4"
          >
            <div>
              <strong>{wrapText(`"${sentence}"`)}</strong>
              <br />➡ {wrapText(explanation)}
            </div>
          </div>
        ))}

        <div className="text-2xl font-semibold text-green-900 mt-10 mb-4">
          {wrapText("📌 When to Use Passive Voice")}
        </div>
        <ul className="list-disc list-inside mb-6">
          <li>{wrapText("When the agent is unknown or obvious")}</li>
          <li>{wrapText("To sound more formal or objective")}</li>
          <li>{wrapText("To focus on the result rather than the doer")}</li>
        </ul>

        <div className="text-xl font-semibold text-green-500 mb-2">
          {wrapText("🔁 Active vs Passive:")}
        </div>
        <ul className="list-disc list-inside mb-6">
          <li>{wrapText("Active: The chef cooked the meal.")}</li>
          <li>{wrapText("Passive: The meal was cooked by the chef.")}</li>
        </ul>

        <div className="text-2xl font-semibold text-green-900 mb-4">
          {wrapText("🎯 Final Tip")}
        </div>
        <div className="mb-10">
          {wrapText(
            "Use passive voice wisely. It’s useful for shifting focus, but too much can make writing vague or impersonal."
          )}
        </div>
      </div>
    </div>
  );
}
