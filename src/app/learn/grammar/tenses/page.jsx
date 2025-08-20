"use client";
import { useEffect, useState } from "react";
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

export default function PartsOfSpeech() {
  const [topic, setTopic] = useState(<Nouns />);
  useEffect(() => {}, [topic]);
  return (
    <div className="grid grid-cols-[280px_auto] grid-rows-[60px_auto] w-screen h-screen">
      <NavBar />
      <SideBar />
      <div className="pt-[40px] p-10 max-w-5xl">
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
    </div>
  );
}
