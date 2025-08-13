"use client"
import { useState } from "react";
import Report from "@/components/Report";
import Link from "next/link";

const subCategoriesCSS =
  "px-4 py-2 hover:underline text-blue-800 text-sm font-medium transition";
export default function SideBar() {
  const [collapsible, setCollapsible] = useState(null);
  return (
    <div className="flex col-start-1 col-end-2 row-start-2 flex-col w-[280px] pl-[30px]">
      <p className="text-2xl text-center font-bold h-10 ">Menu</p>
      <div className="flex flex-col items-start">
        <p
          onClick={() => setCollapsible(collapsible == "grammar" ? null : "grammar")}
          className="flex justify-between w-1/1 rounded-2xl px-3 bg-blue-100 mb-3"
        >
          Grammar
        </p>
        <div
          className={
            collapsible == "grammar" ? "visible flex flex-col h-full place-content-between mb-3 pl-3" : "hidden"
          }>
              <Link href="/learn/grammar/parts-of-speech" className={subCategoriesCSS}>Parts of Speech</Link>
              <Link href="/learn/grammar/sentence-structure" className={subCategoriesCSS}>Sentence Structure</Link>
              <Link href="/learn/grammar/articles" className={subCategoriesCSS}>Articles</Link>
              <Link href="/learn/grammar/tenses" className={subCategoriesCSS}>Tenses</Link>
              <Link href="/learn/grammar/conditionals" className={subCategoriesCSS}>Conditionals</Link>
              <Link href="/learn/grammar/passive-voice" className={subCategoriesCSS}>Passive Voice</Link>
              <Link href="/learn/grammar/reported-speech" className={subCategoriesCSS}>Reported Speech</Link>
            </div>
        <p
          className="flex justify-between w-1/1 rounded-2xl px-3 bg-blue-100 mb-3"
          onClick={() => setCollapsible(collapsible == "vocabulary" ? null : "vocabulary")}
        >
          Vocabulary
        </p>
        <div
          className={
            collapsible == "vocabulary" ? "visible flex flex-col h-full place-content-between mb-3 pl-3" : "hidden"
          }
        >
          <Link className={subCategoriesCSS} href="/learn/vocabulary/dictionary">
            My dictionary
          </Link>
          <Link className={subCategoriesCSS} href="/learn/vocabulary/flashcards">
            Practice
          </Link>
        </div>
        <p
          onClick={() => setCollapsible(collapsible == "pronunciation" ? null : "pronunciation")}
          className="flex justify-between w-1/1 rounded-2xl px-3  bg-gray-200 text-gray-400  mb-3"
          disabled
        >
          Pronunciation
        </p>
        <p
          onClick={() => setCollapsible(collapsible == "writing" ? null : "writing")}
          className="flex justify-between w-1/1 rounded-2xl px-3 bg-blue-100 mb-3"
        >
          Writing
        </p>
        <div
          className={collapsible == "writing" ? "visible mb-3 pl-3" : "hidden"}
        >
          <p
            className={subCategoriesCSS}
            
          >
            Practice Dialog
          </p>
          <p
            className={subCategoriesCSS}
            
          >
            Submit your essay
          </p>
          <p
            className={subCategoriesCSS}
            
          >
            My essays
          </p>
        </div>
        <p
          onClick={() => setCollapsible(collapsible == "speaking" ? null : "speaking")}
          className="flex justify-between w-1/1 rounded-2xl px-3  bg-gray-200 text-gray-400  mb-3"
          disabled
        >
          Speaking
        </p>
      </div>
      <Report />
    </div>
  );
}
