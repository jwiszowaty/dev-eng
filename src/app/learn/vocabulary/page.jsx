"use client";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Vocabulary() {
  const [englishExample, setEnglishExample] = useState("");
  const [polishExample, setPolishExample] = useState("");
  const [polish, setPolish] = useState("");
  const [english, setEnglish] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [karma, setKarma] = useState(null);
  const [vocabulary, setVocabulary] = useState([]);
  const [status, setStatus] = useState("in");
  const [showExample, setShowExample] = useState("");
  const { currentUser } = useAuth();
  const router = useRouter();
  async function handleDelete(id) {
    console.log("word: ", id);
    fetch(`/api/vocabulary?id=${id}`, { method: "DELETE" });
    setStatus("out");
  }
  async function handleSubmit() {
    const body = {
      userId: currentUser.uid,
      english,
      polish,
      englishExample,
      polishExample,
      difficulty: parseInt(difficulty),
    };
    await fetch("/api/vocabulary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    setPolish("");
    setEnglish("");
    setPolishExample("");
    setEnglishExample("");
    setStatus("out");
  }
  useEffect(() => {
    (async function () {
      sessionStorage.removeItem("vocabulary");
      const words = await fetch(`/api/vocabulary?userId=${currentUser?.uid}`)
        .then((response) => response.json())
        .catch((error) => console.log("error: ", error));
      setVocabulary(words);
      sessionStorage.setItem("vocabulary", JSON.stringify(words));
      setKarma(words.reduce((acc, curr) => acc + curr.difficulty, 0));
      setStatus("in");
    })();
  }, [currentUser, status]);

  return (
    <div className="overflow-hidden grid grid-cols-[20vw_60vw_20vw] grid-rows-[60px_calc(100vh-60px)] w-screen h-screen">
      <NavBar />
      <SideBar />
      <div className="h-full box-border max-w-5xl p-10 grid col-start-2 col-end-3 row-start-2 grid-rows-[auto_90px_auto_auto] w-[60vw] pt-0  border-x-2 border-blue-950">
         
        <div className="flex row-start-1 h-[40px] gap-4 place-items-center">
          <p className="text-2xl">My vocabulary</p>
          <div className="flex gap-2">
            <p>Karma</p>
            <p>{karma}</p>
          </div>
          <Link className="flex px-1 rounded border-1 bg-yellow-100" href="/learn/vocabulary/flashcards">
            Practice
          </Link>
        </div>
        {currentUser?.uid && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="row-start-2 flex gap-2 place-items-center py-2 pr-2 w-full h-[90px]"
          >
            <div className="flex flex-col justify-between w-full max-w-[600px] gap-2 h-full">
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
            </div>
            <button
              type="submit"
              className="rounded border-1 border-gray-700 px-1 my-2 w-min h-full outline-none"
            >
              add
            </button>
          </form>
        )}

        <div className="row-start-3 grid grid-cols-[1fr_1fr_1fr_4fr] gap-4 h-min w-full place-items-center border-1">
          <p className="px-2 text-center w-full">english</p>
          <p className="px-2 text-center w-full">polish</p>
          <p className="px-2 text-center w-full">karma</p>
          <p className=""></p>
        </div>
        <div className="row-start-4 flex flex-col overflow-y-auto h-full border-1 w-full">
          {vocabulary?.length > 0 &&
            vocabulary.map((word) => {
              return (
                <div key={word._id} className="h-full w-full hover:bg-amber-50">
                  <div className="grid grid-cols-[1fr_1fr_1fr_4fr] h-min place-items-center gap-4">
                    <p className="px-2 h-min text-center">{word.polish}</p>
                    <p className="px-2 h-min text-center">{word.english}</p>
                    <p className="px-2 h-min text-center">{word.difficulty}</p>
                    <div className="flex place-items-center">
                      <div
                        onClick={() =>
                          setShowExample(
                            showExample === word._id ? "" : word._id
                          )
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
                    ).concat(" px-7")}
                  >
                    <div>
                      <p className="flex col-span-3">{word.englishExample}</p>
                      <p className="flex col-span-3">{word.polishExample}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
