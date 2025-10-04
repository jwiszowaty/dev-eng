import { dictionary } from "@/lib/dictionary";

export default function Dictionary({ word }) {
  return (
    <div className="flex flex-col place-items-center col-start-2 w-[280px] pr-[30px]">
      <p>Dictionary</p>
      {dictionary[word] ?? "Select a word to view its meaning."}
    </div>
  );
}
