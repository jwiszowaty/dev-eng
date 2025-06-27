import { dictionary } from "@/dictionary";
const vocab = []
export default function Word({children }) {
  let word = children.toLowerCase().replaceAll(/"|\.|!|\?|\)|\(|,|:|^\W*'|'\W*$|—/g, "");
  word = word.replace("’", "'");
  
  
  return (
    <span className="relative group cursor-help inline-block">
      {children}
      <span className="absolute hidden group-hover:block text-white bg-gray-800 text-xs rounded px-2 py-1 bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap z-10">
        {dictionary[word] ?? word}
      </span>
    </span>
  );
}
