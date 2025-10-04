import { getVocabulary } from "@/services/vocabularyApi";
import { useEffect, useState } from "react";

function Flashcards({ selectedStudent }) {
  const [englishExample, setEnglishExample] = useState("");
  const [polishExample, setPolishExample] = useState("");
  const [polish, setPolish] = useState("");
  const [english, setEnglish] = useState("");
  const [vocabulary, setVocabulary] = useState();
  const [showExample, setShowExample] = useState("");
  useEffect(() => {
    (async function () {
      const words = await getVocabulary(selectedStudent.userId);
      setVocabulary(words);
    })();
  }, [selectedStudent]);
  return (
    <div className="h-full pl-10 box-border max-w-5xl grid col-start-2 col-end-3 row-start-2 grid-rows-[min_90px_26px_auto] w-[60vw] pt-0 border-blue-950">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="row-start-2 flex gap-2 place-items-center py-2 w-full h-[90px]"
      >
        <div className="flex flex-col justify-between w-full  gap-2 h-full">
          <div className="flex gap-2 w-full justify-start place-items-center">
            <span className="text-2xl">🇬🇧</span>
            <input
              onChange={(e) => setEnglish(e.target.value)}
              value={english}
              className="border-1 border-gray-400 text-center h-min"
              placeholder="english"
              required
            />
            <input
              onChange={(e) => setEnglishExample(e.target.value)}
              value={englishExample}
              className="w-full border-1 border-gray-400 text-center h-min"
              placeholder="example"
            />
          </div>
          <div className="flex gap-2 w-full justify-start place-items-center">
            <span className="text-2xl">🇵🇱</span>
            <input
              onChange={(e) => setPolish(e.target.value)}
              value={polish}
              className="border-1 border-gray-400 text-center h-min"
              placeholder="polish"
              required
            />
            <input
              onChange={(e) => setPolishExample(e.target.value)}
              value={polishExample}
              className="w-full border-1 border-gray-400 text-center h-min"
              placeholder="przykład"
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded border-1 border-gray-700 px-1 my-2 w-min h-full outline-none"
        >
          add
        </button>
      </form>
      <div className="row-start-3 grid grid-cols-[1fr_1fr_1fr_4fr] gap-4 h-min w-full place-items-center border-1">
        <p className="px-2 text-center w-full">english</p>
        <p className="px-2 text-center w-full">polish</p>
        <p className="px-2 text-center w-full">karma</p>
        <p className=""></p>
      </div>
      <div className="row-start-4 flex flex-col overflow-y-auto h-full border-1 w-full">
        {vocabulary?.length === 0 && <p className="mx-3">No words added.</p>}
        {vocabulary?.length > 0 &&
          vocabulary.map((word) => {
            return (
              <div key={word._id} className="h-min w-full hover:bg-amber-50">
                <div className="grid grid-cols-[1fr_1fr_1fr_4fr] h-min place-items-center gap-4 shadow-md">
                  <p className="px-2 h-min text-center">{word.polish}</p>
                  <p className="px-2 h-min text-center">{word.english}</p>
                  <p className="px-2 h-min text-center">{word.difficulty}</p>
                  <div className="flex place-items-center">
                    <div
                      onClick={() =>
                        setShowExample(showExample === word._id ? "" : word._id)
                      }
                      className={
                        "text-nowrap h-min cursor-default rounded-2xl px-2 hover:underline text-blue-700"
                      }
                    >
                      {showExample == word._id
                        ? "hide examples"
                        : "show examples"}
                    </div>
                    <button className="text-blue-700 p-1 m-1 h-min w-full text-center hover:underline">
                      edit
                    </button>
                    <button
                      className="text-blue-700 p-1 m-1 h-min w-full text-center hover:underline"
                      onClick={() => handleDelete(word._id)}
                    >
                      delete
                    </button>
                  </div>
                </div>

                <div
                  className={(showExample == word._id
                    ? "visible"
                    : "hidden"
                  ).concat(" px-7 mt-2")}
                >
                  <div>
                    <p className="flex col-span-3">🇬🇧 {word.englishExample}</p>
                    <p className="flex col-span-3">🇵🇱 {word.polishExample}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Flashcards;
