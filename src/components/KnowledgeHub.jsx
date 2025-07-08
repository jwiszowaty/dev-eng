import { useEffect, useState } from "react";
import PrSimpleCont from "./Grammar/PrSimpleCont";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PastSimpleCont from "./Grammar/PastSimpleCont";
import PrPerfPastSimple from "./Grammar/PrPerfPastSimple";
import PartsOfSpeech from "./Grammar/PartsOfSpeech";
import Nouns from "./Grammar/Nouns";
import SentenceStructure from "./Grammar/SentenceStructure";
import EnglishArticles from "./Grammar/EnglishArticles";
import Conditionals from "./Grammar/Conditionals";
import FutureForms from "./Grammar/FutureForms";
import PassiveVoice from "./Grammar/PassiveVoice";
import ReportedSpeech from "./Grammar/ReportedSpeech";
import PracticeDialog from "./Writing/PracticeDialog";
import CheckEssay from "./Writing/CheckEssay";
const articles = {
  PresentSimplePresentContinuous: <PrSimpleCont />,
  PastSimplePastContinuous: <PastSimpleCont />,
  PresentPerfectPastSimple: <PrPerfPastSimple />,
  PartsOfSpeech: <PartsOfSpeech />,
  SentenceStructure: <SentenceStructure />,
  EnglishArticles: <EnglishArticles />,
  Conditionals: <Conditionals />,
  FutureForms: <FutureForms />,
  PassiveVoice: <PassiveVoice />,
  ReportedSpeech: <ReportedSpeech />,
  PracticeDialog: <PracticeDialog />,
  CheckEssay: <CheckEssay />,
};

const subCategoriesCSS =
  "px-4 py-2 hover:underline text-blue-800 text-sm font-medium transition";
export default function KnowledgeHub() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsible, setCollapsible] = useState(null);
  const [content, setContent] = useState(<p> ⬅️ choose a subject</p>);
  const searchParams = useSearchParams();
  const currentSlug = searchParams.get("article");
  const handleClick = (slug) => {
    router.push(pathname.concat(`?article=${slug}`));
  };
  useEffect(() => {
    if (currentSlug && articles[currentSlug]) {
      setContent(articles[currentSlug]);
    } else {
      setContent(<p>⬅️ choose a subject</p>);
    }
  }, [currentSlug]);
  return (
    <div className="flex">
      <div className="flex flex-col w-[280px]">
        <p className="text-2xl text-center font-bold h-10 ">Menu</p>
        <div className="flex flex-col items-start">
          <button
            className="flex justify-between w-1/1 rounded-2xl px-3 bg-blue-100 mb-3"
            onClick={() => {
              setCollapsible(collapsible == "grammar" ? null : "grammar");
            }}
          >
            Grammar
            {collapsible == "grammar" ? <p>▼</p> : <p>◄</p>}
          </button>
          <div
            className={
              collapsible == "grammar" ? "visible mb-3 pl-3" : "hidden"
            }
          >
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("PartsOfSpeech")}
            >
              Parts of Speech
            </p>
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("SentenceStructure")}
            >
              Sentence Structure
            </p>
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("EnglishArticles")}
            >
              Articles
            </p>
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("PresentSimplePresentContinuous")}
            >
              Present Simple vs. Present Continuous
            </p>
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("PastSimplePastContinuous")}
            >
              Past Simple vs. Past Continuous
            </p>
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("PresentPerfectPastSimple")}
            >
              Present Perfect vs. Past Simple
            </p>
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("FutureForms")}
            >
              Future forms
            </p>
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("Conditionals")}
            >
              Conditionals
            </p>
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("PassiveVoice")}
            >
              Passive Voice
            </p>
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("ReportedSpeech")}
            >
              Reported Speech
            </p>
          </div>
          <button
            disabled
            className="flex justify-between w-1/1 rounded-2xl px-3 bg-gray-200 text-gray-400 mb-3"
            onClick={() => {
              setCollapsible(collapsible == "vocabulary" ? null : "vocabulary");
            }}
          >
            Vocabulary
            {/* {collapsible == "grammar" ? <p>▼</p> : <p>◄</p>} */}
          </button>
          <div
            className={
              collapsible == "vocabulary" ? "visible mb-3 pl-3" : "hidden"
            }
          >
            <p>Hi vocab</p>
          </div>
          <button
            className="flex justify-between w-1/1 rounded-2xl px-3  bg-gray-200 text-gray-400  mb-3"
            disabled
          >
            Pronunciation
          </button>
          <button
            onClick={() => {
              setCollapsible(collapsible == "writing" ? null : "writing");
            }}
            className="flex justify-between w-1/1 rounded-2xl px-3 bg-blue-100 mb-3"
          >
            Writing
            {collapsible == "writing" ? <p>▼</p> : <p>◄</p>}
          </button>
          <div
            className={
              collapsible == "writing" ? "visible mb-3 pl-3" : "hidden"
            }
          >
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("PracticeDialog")}
            >
              Practice Dialog
            </p>
            <p
              className={subCategoriesCSS}
              onClick={() => handleClick("CheckEssay")}
            >
              Submit your essay
            </p>
          </div>
          <button
            className="flex justify-between w-1/1 rounded-2xl px-3  bg-gray-200 text-gray-400  mb-3"
            disabled
          >
            Speaking
          </button>
        </div>
      </div>
      {content}
    </div>
  );
}
