"use client";
import { useEffect, useState } from "react";
import { uploadEssay } from "@/lib/funcs";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/common/NavBar";

import { useRouter } from "next/navigation";

export default function page() {
  const [show, setShow] = useState(null);
  const [essaySubmission, setEssaySubmission] = useState(false);
  const [title, setTitle] = useState("");
  const [essay, setEssay] = useState("");
  const [essays, setEssays] = useState([]);
  const { currentUser } = useAuth();
  async function submitEssay() {
    await uploadEssay(currentUser.uid, title, essay);
    setTitle("");
    setEssay("");
    setEssaySubmission(false);
  }
  useEffect(() => {
    if (currentUser?.uid) {
      (async function () {
        const essays = await fetch(`/api/essays?id=${currentUser.uid}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .catch((error) => console.error("error fetching essays: ", error));
        setEssays(essays.data);
        console.log(essays.data);
        
      })();
    }
  }, [currentUser, essaySubmission]);
  return (
    <div>
      <NavBar />
      <div className="w-[60vw] place-self-center">
      <div className="flex gap-4 place-items-center my-2">
      <p className="text-2xl">Essays</p>
        <button
          onClick={() => setEssaySubmission(true)}
          className="px-1 rounded border-1 bg-yellow-100 h-[26px]"
        >
          Submit an essay
        </button>
        <div
          className={`place-content-center place-items-center absolute top-0 left-0 w-screen h-dvh backdrop-blur-sm overflow-hidden ${
            essaySubmission ? "visible" : "hidden"
          }`}
        >
          <form
            className="p-10 pb-0 rounded-xl shadow-2xl max-w-[1500px] min-w-[300px] h-[90%] w-1/2 flex flex-col gap-3 bg-blue-950 text-black place-items-center"
            onSubmit={(e) => {
              e.preventDefault();
              submitEssay();
            }}
          >
            <div className="flex justify-between w-full">
              <p className="place-self-center text-4xl text-white text-shadow-black text-shadow-xs font-bold">
                Essay submission
              </p>
              <p
                onClick={() => setEssaySubmission(false)}
                className="rounded-full text-red-500 place-self-end text-center cursor-default hover:underline"
              >
                cancel
              </p>
            </div>
            <div className="flex w-full gap-3">
              <p className="text-white text-2xl font-bold w-min">Title</p>
              <input
                required
                className="bg-white rounded-xl w-full px-2"
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                  console.log(title);
                }}
              />
            </div>
            <textarea
              required
              className="border rounded-xl flex w-1/1 h-full px-2 bg-white"
              value={essay || ""}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Type your essay..."
            />
            <button
              type="submit"
              className="border rounded w-1/5 h-min bg-white mb-3 hover:bg-green-400"
            >
              📤 Send
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-1 h-full w-full py-5">
        {essays &&
          essays.map((essay) => {
            return (
              <div>
                <p
                  className="pl-3 italic text-l border-1 border-b-black border-r-gray-500 border-gray-100"
                  onClick={() => setShow(show == essay._id ? null : essay._id)}
                >
                  {essay.title}
                </p>
                <div
                  className={
                    show == essay._id
                      ? "visible box-border w-full p-10 grid grid-cols-[calc(60%-8px)_40%] gap-[8px] overflow-scroll bg-blue-100"
                      : "hidden"
                  }
                >
                  <p className="col-start-1 col-end-2">{essay.text}</p>
                  <div className="flex col-start-2 col-end-3 flex-col gap-1 w-full shadow p-2 bg-white">
                    <div
                      dangerouslySetInnerHTML={{ __html: essay.feedback }}
                    ></div>
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
