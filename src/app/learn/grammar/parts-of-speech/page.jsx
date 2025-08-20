"use client";
import { useState } from "react";
import Nouns from "../../../../components/parts-of-speech/Nouns";
import Pronouns from "../../../../components/parts-of-speech/Pronouns";
import Adverbs from "../../../../components/parts-of-speech/Adverbs";
import Verbs from "../../../../components/parts-of-speech/Verbs";
import Adjectives from "../../../../components/parts-of-speech/Adjectives";
import Prepositions from "../../../../components/parts-of-speech/Prepositions";
import Conjunctions from "../../../../components/parts-of-speech/Conjunctions";
import Interjections from "../../../../components/parts-of-speech/Interjections";
import Word from "../../../../components/Word";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import Dictionary from "@/components/Dictionary";

export default function PartsOfSpeech() {
  const [word, setWord] = useState("Defhjhjhinition");
  const [topic, setTopic] = useState(<Nouns setWord={setWord} />);
  return (
    <div className="grid grid-cols-[280px_auto] grid-rows-[60px_auto] w-screen h-screen">
      <NavBar />
      <SideBar />
      <div className="col-start-2 row-start-2 grid grid-cols-[auto_280px] w-full h-full">
        <div className="col-start-1 col-end-2 pt-[40px] p-10 max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
            <button
              className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
              onClick={() => setTopic(<Nouns setWord={setWord} />)}
            >
              <Word setWord={setWord}>Nouns</Word>
            </button>
            <button
              className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
              onClick={() => setTopic(<Pronouns setWord={setWord} />)}
            >
              <Word setWord={setWord}>Pronouns</Word>
            </button>
            <button
              className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
              onClick={() => setTopic(<Verbs setWord={setWord} />)}
            >
              <Word setWord={setWord}>Verbs</Word>
            </button>
            <button
              className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
              onClick={() => setTopic(<Adjectives setWord={setWord} />)}
            >
              <Word setWord={setWord}>Adjectives</Word>
            </button>
            <button
              className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
              onClick={() => setTopic(<Adverbs setWord={setWord} />)}
            >
              <Word setWord={setWord}>Adverbs</Word>
            </button>
            <button
              className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
              onClick={() => setTopic(<Prepositions setWord={setWord} />)}
            >
              <Word setWord={setWord}>Prepositions</Word>
            </button>
            <button
              className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
              onClick={() => setTopic(<Conjunctions setWord={setWord} />)}
            >
              <Word setWord={setWord}>Conjunctions</Word>
            </button>
            <button
              className="border rounded px-3 py-1 hover:bg-green-100 transition text-sm"
              onClick={() => setTopic(<Interjections setWord={setWord} />)}
            >
              <Word setWord={setWord}>Interjections</Word>
            </button>
          </div>
          <div>{topic}</div>
        </div>
        <Dictionary word={word} />
      </div>
    </div>
  );
}
