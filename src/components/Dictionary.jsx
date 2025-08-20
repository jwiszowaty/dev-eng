import { dictionary } from "@/dictionary";

export default function Dictionary({word}) {
  return (
    <div className="flex flex-col place-items-center col-start-2 bg-amber-400 w-[280px] pr-[30px]">
          {dictionary[word] ?? "Definition"}
          
    </div>
  );
}
