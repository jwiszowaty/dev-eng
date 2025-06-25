import { useState } from "react";
import Grammar from "./Grammar/Grammar";
import Vocabulary from "./Vocabulary";
import PrSimpleCont from "./Grammar/PrSimpleCont";

export default function KnowledgeHub() {
  const [collapsible, setCollapsible] = useState(null);
  const [content, setContent] = useState(<p> ⬅️ choose a subject</p>)
  return (
    <div className="flex">
      <div className="flex flex-col w-80">
        <p className="text-2xl text-center font-bold w-40 h-10 ">Menu</p>
        <div className="flex flex-col items-start">
          <button
            className="flex justify-between w-40 rounded-2xl px-3 bg-blue-100 mb-3"
            onClick={() => {
              setCollapsible(collapsible == "grammar" ? null : "grammar");
            }}
          >
            Grammar
            {collapsible == "grammar" ? <p>▼</p> : <p>◄</p>} 
          </button>
          <div className={collapsible == "grammar" ? "visible mb-3 pl-3" : "hidden"}>
            <p>Parts of Speech</p>
            <p>Sentence Structure</p>
            <p>Articles</p>
            <p onClick={() => setContent(<PrSimpleCont/>)}>Present Simple vs. Present Continuous</p>
            <p>Past Simple vs. Past Continuous</p>
            <p>Present Perfect vs. Past Simple</p>
            <p>Future forms</p>
            <p>Conditionals</p>
            <p>Passive Voice</p>
            <p>Reported Speech</p>
          </div>
          <button
            className="flex justify-between w-40 rounded-2xl px-3 bg-blue-100 mb-3"
            onClick={() => {
              setCollapsible(collapsible == "vocabulary" ? null : "vocabulary");
            }}
          >
            Vocabulary
            {collapsible == "grammar" ? <p>▼</p> : <p>◄</p>} 
          </button>
          <div className={collapsible == "vocabulary" ? "visible mb-3 pl-3" : "hidden"}>
            <p>Hi vocab</p>
          </div>
          <button className="flex justify-between w-40 rounded-2xl px-3 bg-blue-100 mb-3" disabled>
            Pronunciation
          </button>
          <button className="flex justify-between w-40 rounded-2xl px-3 bg-blue-100 mb-3" disabled>Writing</button>
          <button className="flex justify-between w-40 rounded-2xl px-3 bg-blue-100 mb-3" disabled>Speaking</button>
        </div>
      </div>
      {content}
    </div>
  );
}
