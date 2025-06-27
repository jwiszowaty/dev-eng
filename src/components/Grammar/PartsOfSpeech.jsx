import { useEffect, useState } from "react";
import Nouns from "./Nouns";
import Pronouns from "./Pronouns";
import Adverbs from "./Adverbs";
import Verbs from "./Verbs";
import Adjectives from "./Adjectives";
import Prepositions from "./Prepositions";
import Conjunctions from "./Conjunctions";
import Interjections from "./Interjections";
import Word from "../Word";

export default function PartsOfSpeech() {
  const [topic, setTopic] = useState(<Nouns />);
  useEffect(() => {}, [topic]);
  return (
    <div className="p-6 max-w-5xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
        <button
          className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
          onClick={() => setTopic(<Nouns />)}
        >
          <Word>Nouns</Word>
        </button>
        <button
          className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
          onClick={() => setTopic(<Pronouns />)}
        >
          <Word>Pronouns</Word>
        </button>
        <button
          className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
          onClick={() => setTopic(<Verbs />)}
        >
          <Word>Verbs</Word>
        </button>
        <button
          className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
          onClick={() => setTopic(<Adjectives />)}
        >
          <Word>Adjectives</Word>
        </button>
        <button
          className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
          onClick={() => setTopic(<Adverbs />)}
        >
          <Word>Adverbs</Word>
        </button>
        <button
          className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
          onClick={() => setTopic(<Prepositions />)}
        >
          <Word>Prepositions</Word>
        </button>
        <button
          className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
          onClick={() => setTopic(<Conjunctions />)}
        >
          <Word>Conjunctions</Word>
        </button>
        <button
          className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
          onClick={() => setTopic(<Interjections />)}
        >
          <Word>Interjections</Word>
        </button>
      </div>

      <div>{topic}</div>
    </div>
  );
}
