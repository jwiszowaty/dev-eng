"use client";
import NavBar from "@/components/common/NavBar.jsx";
import Word from "../../../../components/Word.jsx";

export default function page() {
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
          {wrapText("📚 English Articles: a, an, the")}
        </div>

        <div className="mb-4">
          {wrapText(
            "Articles are small but important words placed before nouns. They help indicate whether we're talking about something specific or general."
          )}
        </div>

        <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
          {wrapText("🅰️ Indefinite Articles: a / an")}
        </div>
        <div className="mb-2">
          {wrapText(
            "Use 'a' before words that begin with a consonant sound, and 'an' before vowel sounds."
          )}
        </div>
        <ul className="list-disc list-inside mb-4">
          <li>{wrapText("a dog, a university (sounds like 'yoo')")}</li>
          <li>{wrapText("an apple, an hour (silent 'h')")}</li>
        </ul>

        <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
          {wrapText("🔤 Definite Article: the")}
        </div>
        <div className="mb-2">
          {wrapText(
            "Use 'the' when you are talking about something specific or previously mentioned."
          )}
        </div>
        <ul className="list-disc list-inside mb-4">
          <li>{wrapText("the sun, the book you gave me")}</li>
          <li>{wrapText("the first time, the best option")}</li>
        </ul>

        <div className="text-xl font-semibold text-green-500 mb-2">
          {wrapText("💡 Examples:")}
        </div>
        {[
          [
            "I saw a cat in the garden.",
            "'A cat' means any cat. 'The garden' is a specific one, maybe yours.",
          ],
          [
            "He is an honest man.",
            "Use 'an' because 'honest' starts with a vowel sound (silent 'h').",
          ],
          [
            "The moon looks bright tonight.",
            "We say 'the moon' because it's one specific object we all know.",
          ],
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
          {wrapText("🎯 Final Tip")}
        </div>
        <div className="mb-10">
          {wrapText(
            "If you’re not sure whether to use 'a', 'an', or 'the', ask: Am I talking about something general or specific? And does the word start with a vowel sound?"
          )}
        </div>
      </div>
    </div>
  );
}
