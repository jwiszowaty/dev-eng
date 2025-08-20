"use client"
import { dictionary } from "@/dictionary";
const vocab = []
export default function Word({children, setWord }) {
  let word = children.toLowerCase().replaceAll(/"|\.|!|\?|\)|\(|,|:|^\W*'|'\W*$|—|”|“/g, "");
  word = word.replace("’", "'");
  if (!dictionary.hasOwnProperty(word) && !vocab.includes(word)) vocab.push(word);
  if (vocab.length > 0) console.log(vocab);
  return <span onClick={() => setWord(word)} className="hover:underline cursor-default">{children}</span>;
}
