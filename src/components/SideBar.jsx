"use client";
import Report from "@/components/Report";
import Link from "next/link";

const subCategoriesCSS = "px-4 py-2 hover:underline text-blue-800 text-sm font-medium transition";
export default function SideBar() {
  return (
    <div className="flex h-full col-start-1 col-end-2 row-start-2 flex-col w-[280px] place-items-end place-self-end">
      <p className="flex place-content-start place-items-center text-2xl text-center font-bold h-[40px] px-4">Menu</p>
      <div className="flex flex-col place-items-end place-content-between mb-3 pl-3">
        <Link
          href="/learn/grammar/auxiliary-modal"
          className={subCategoriesCSS}
        >
          Auxiliary & Modal Verbs
        </Link>
        <Link
          href="/learn/grammar/parts-of-speech"
          className={subCategoriesCSS}
        >
          Parts of Speech
        </Link>
        <Link
          href="/learn/grammar/sentence-structure"
          className={subCategoriesCSS}
        >
          Sentence Structure
        </Link>
        <Link href="/learn/grammar/articles" className={subCategoriesCSS}>
          Articles
        </Link>
        <Link href="/learn/grammar/tenses" className={subCategoriesCSS}>
          Tenses
        </Link>
        <Link href="/learn/grammar/conditionals" className={subCategoriesCSS}>
          Conditionals
        </Link>
        <Link href="/learn/grammar/passive-voice" className={subCategoriesCSS}>
          Passive Voice
        </Link>
        <Link
          href="/learn/grammar/reported-speech"
          className={subCategoriesCSS}
        >
          Reported Speech
        </Link>
      </div>
      <Report />
    </div>
  );
}
