"use client";
import Word from "../../../../components/Word.jsx";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function ReportedSpeech() {
  const wrapText = (text) =>
    text
      .split(/(\s+)/)
      .map((part, i) =>
        /\s+|^\W$|\d/u.test(part) ? part : <Word key={i}>{part}</Word>
      );

  return (
    <div className="grid grid-cols-[280px_auto] grid-rows-[60px_auto] w-screen h-screen">
      <NavBar />
      <SideBar />
      <div className="pt-[40px] p-10 max-w-5xl">
        <div className="text-3xl font-bold text-black mb-6">
          {wrapText("🗣️ Reported Speech in English")}
        </div>

        <div className="mb-4">
          {wrapText(
            "Reported speech (or indirect speech) is how we talk about what someone else said, without quoting their exact words."
          )}
        </div>

        <div className="text-2xl font-semibold text-green-900 mt-6 mb-4">
          {wrapText("📋 Basic Rules")}
        </div>
        <ul className="list-disc list-inside mb-4">
          <li>{wrapText("Change the pronouns")}</li>
          <li>{wrapText("Shift the verb tense back (usually)")}</li>
          <li>{wrapText("Remove quotation marks")}</li>
        </ul>

        <div className="text-xl font-semibold text-green-500 mb-2">
          {wrapText("💬 Reporting Statements")}
        </div>
        {[
          ["She said, 'I am tired.'", "She said (that) she was tired."],
          ["He said, 'I like coffee.'", "He said he liked coffee."],
        ].map(([direct, reported], index) => (
          <div
            key={index}
            className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4"
          >
            <div>
              <strong>{wrapText(`Direct: ${direct}`)}</strong>
              <br />➡ {wrapText(`Reported: ${reported}`)}
            </div>
          </div>
        ))}

        <div className="text-xl font-semibold text-green-500 mb-2">
          {wrapText("❓ Reporting Questions")}
        </div>
        {[
          ["He asked, 'Where do you live?'", "He asked where I lived."],
          ["She asked, 'Do you like pizza?'", "She asked if I liked pizza."],
        ].map(([direct, reported], index) => (
          <div
            key={index}
            className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4"
          >
            <div>
              <strong>{wrapText(`Direct: ${direct}`)}</strong>
              <br />➡ {wrapText(`Reported: ${reported}`)}
            </div>
          </div>
        ))}

        <div className="text-xl font-semibold text-green-500 mb-2">
          {wrapText("🗂️ Reporting Commands & Requests")}
        </div>
        {[
          ["He said, 'Close the door.'", "He told me to close the door."],
          ["She said, 'Please help me.'", "She asked me to help her."],
        ].map(([direct, reported], index) => (
          <div
            key={index}
            className="bg-green-50 border-l-4 border-green-500 p-4 mb-3 w-3/4"
          >
            <div>
              <strong>{wrapText(`Direct: ${direct}`)}</strong>
              <br />➡ {wrapText(`Reported: ${reported}`)}
            </div>
          </div>
        ))}

        <div className="text-2xl font-semibold text-green-900 mb-4">
          {wrapText("🎯 Final Tip")}
        </div>
        <div className="mb-10">
          {wrapText(
            "Remember: backshift the tense, adjust pronouns, and drop quotation marks when reporting what someone said."
          )}
        </div>
      </div>
    </div>
  );
}
