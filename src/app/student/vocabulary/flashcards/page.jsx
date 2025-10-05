"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function page() {
  const [language, setLanguage] = useState(null);
  const [check, setCheck] = useState(false)
  const [number, setNumber] = useState(0);
  const [words, setWords] = useState(null);
  const { currentUser } = useAuth();
  const router = useRouter();
    useEffect(() => {
    (async function () {
      const words = await fetch(`/api/vocabulary?userId=${currentUser?.uid}`)
        .then((response) => response.json())
        .catch((error) => console.log("error: ", error));
      setWords(words);
    })();
  }, []);
  async function handleNext(word, karma) {
    const body = {
      _id: word._id,
      english: word.english,
      polish: word.polish,
      englishExample: word.englishExample,
      polishExample: word.polishExample,
      difficulty: parseInt(word.difficulty + karma),
    };
    await fetch("/api/vocabulary", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    setNumber(words.length == 1 ? 0 : (number + 1) % (words.length));
    setCheck(false);
    setLanguage(language == "polish" ? "english" : "polish");
  }
  function handleFlip() {
    setLanguage(language == "polish" ? "english" : "polish");
    setCheck(!check);
  }
  if (!language) {
    return (
      <div className="flex flex-col gap-2 w-4/5 place-self-center place-items-center m-5">
        <p>Flashcards</p>
        <button className="border-1 border-gray-400 p-1" onClick={() => setLanguage("polish")}>polish to english</button>
        <button className="border-1 border-gray-400 p-1" onClick={() => setLanguage("english")}>english to polish</button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 grid-rows-[60px_200px] w-[95vw] md:max-w-[600px] max-h-[400px] md:w-1/2 place-self-center">
      <p className="text-2xl flex justify-center place-items-center">Flashcards</p>
      <button className="bg-gray-300 rounded-full border flex w-1/2 max-w-[600px] justify-center place-items-center place-self-center" onClick={() => router.back()}>home</button>
      {words && (
        <div className="grid row-start-2 col-start-1 col-span-2 grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr_1fr] border-2 w-full h-full overflow-hidden">
          <img src={language == "polish" ? "/polishFlag.svg" : "/ukFlag.svg"} className="col-start-1 row-start-1 h-[30px] w-[60px] object-fill" />
          <p className="flex col-start-1 row-start-1 justify-center items-center bg-gray-300 w-[30px] h-[30px] ml-[60px] text-xl">{number + 1}</p>
          <p className="flex  col-start-1 col-end-4 row-start-2 justify-center items-center">{words[number]?.[language]}</p>
          <p className="flex col-start-1 col-end-4 row-start-3 justify-center items-center">{words[number]?.[(language.concat("Example"))]}</p>
          <button className={(check ? "bg-gray-300 col-start-1 col-end-2 " : "bg-orange-300 col-start-1 col-end-4 ").concat("flex row-start-4 justify-center items-center self-end w-full h-[30px]")} onClick={handleFlip}>{check ? "back" : "check"}</button>
          {check && <button className="flex col-start-2 col-span-1 row-start-4 justify-center place-items-center self-end h-[30px] bg-green-300" onClick={() => handleNext(words[number], 1)}>know</button>}
          {check && <button className="flex col-start-3 col-span-1 row-start-4 justify-center place-items-center self-end h-[30px] bg-orange-300" onClick={() => handleNext(words[number], -1)}>don't know</button>}
        </div>
      )}
    </div>
  );
}
