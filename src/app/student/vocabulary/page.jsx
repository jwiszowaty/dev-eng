"use client";
import NavBar from "@/components/common/NavBar";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Vocabulary() {
  const [showOptions, setShowOptions] = useState(false);
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
    <div>
      <NavBar />
      <div className="w-[95vw] md:max-w-[60vw] h-full place-self-center">
        <div className="flex flex-wrap place-items-center my-2">
          <p className="text-2xl mr-4">My vocabulary</p>
          <Link
            className="flex px-1 mr-4 rounded border-1 bg-yellow-100"
            href="/student/vocabulary/flashcards"
          >
            Practice
          </Link>
          <div className="flex gap-2">
            <p>Karma</p>
            <p>{karma}</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col md:flex-row place-items-center my-4 p-2 h-full gap-4 bg-amber-200"
        >
          <div className="flex flex-col justify-between w-full gap-4 h-full">
            <div className="flex flex-col md:flex-row gap-2 w-full justify-start place-items-center">
              <input
                onChange={(e) => setPolish(e.target.value)}
                value={polish}
                className="w-full border-1 border-gray-400 text-center h-min bg-white"
                placeholder="🇵🇱 polish"
                required
              />
              <input
                onChange={(e) => setPolishExample(e.target.value)}
                value={polishExample}
                className="w-full border-1 border-gray-400 text-center h-min italic bg-white"
                placeholder="🇵🇱 przykład"
              />
            </div>
            <div className="flex gap-2 w-full justify-start place-items-center">
              <div className="flex flex-col md:flex-row gap-2 w-full justify-start place-items-center ">
                <input
                  onChange={(e) => setEnglish(e.target.value)}
                  value={english}
                  className="w-full border-1 border-gray-400 text-center h-min bg-white"
                  placeholder="🇬🇧 english"
                  required
                />
                <input
                  onChange={(e) => setEnglishExample(e.target.value)}
                  value={englishExample}
                  className="w-full border-1 border-gray-400 text-center h-min italic bg-white"
                  placeholder="🇬🇧 example"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="rounded border-1 border-gray-700 px-1 md:w-min w-full md:h-[60px] outline-non bg-white"
          >
            add (enter)
          </button>
        </form>

        <div className="grid grid-cols-[2fr_2fr_1fr] md:grid-cols-[2fr_2fr_1fr_4fr] h-min w-full place-items-center border-1 gap-1">
          <p className="px-2 text-center w-full">english</p>
          <p className="px-2 text-center w-full">polish</p>
          <p className="px-2 text-center w-full">🧠</p>
        </div>
        {vocabulary?.length > 0 && (
          <div className="row-start-4 flex flex-col overflow-y-auto h-full border-1 w-full">
            {vocabulary.map((word) => {
              return (
                <div key={word._id} className="h-min w-full hover:bg-amber-50">
                  <div
                    onClick={() => setShowOptions(!showOptions)}
                    className="grid grid-cols-[2fr_2fr_1fr] md:grid-cols-[2fr_2fr_1fr_4fr] gap-1 h-min w-full place-items-center"
                  >
                    <p className="px-2 h-min text-center">{word.polish}</p>
                    <p className="px-2 h-min text-center">{word.english}</p>
                    <p className="px-2 h-min text-center">{word.difficulty}</p>
                    <div className="md:flex place-items-center hidden md:visible">
                      <div
                        onClick={() =>
                          setShowExample(
                            showExample === word._id ? "" : word._id
                          )
                        }
                        className={
                          "hidden md:visible text-nowrap h-min cursor-default rounded-2xl px-2 hover:underline text-blue-700"
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
                    <div className="py-1">
                      <p className="flex col-span-3 text-gray-600">
                        {word.englishExample}
                      </p>
                      <p className="flex col-span-3 text-gray-600">
                        {word.polishExample}
                      </p>
                    </div>
                  </div>
                  <div
                    className={"flex flex-col place-items-center".concat(
                      showOptions ? " visible" : " hidden"
                    )}
                  >
                    <div
                      className={(showExample == word._id
                        ? "visible"
                        : "md:hidden"
                      ).concat(" px-7")}
                    >
                      <div className="py-1">
                        <p className="flex col-span-3 text-gray-600">
                          {word.englishExample}
                        </p>
                        <p className="flex col-span-3 text-gray-600">
                          {word.polishExample}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div
                        onClick={() =>
                          setShowExample(
                            showExample === word._id ? "" : word._id
                          )
                        }
                        className={
                          "hidden md:visible text-nowrap h-min cursor-default rounded-2xl px-2 hover:underline text-blue-700"
                        }
                      >
                        {showExample == word._id
                          ? "hide examples"
                          : "show examples"}
                      </div>
                      <button className="text-blue-700 h-min w-full text-center hover:underline">
                        edit
                      </button>
                      <button
                        className="text-blue-700 h-min w-full text-center hover:underline"
                        onClick={() => handleDelete(word._id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {vocabulary?.length === 0 && <p className="w-full p-2 italic text-xl">I'm speechless . . .</p>}
      </div>
    </div>
  );
}
