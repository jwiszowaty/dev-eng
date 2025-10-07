"use client";
import { useEffect, useState } from "react";
import { uploadEssay } from "@/lib/funcs";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/common/NavBar";
import EssaySubmission from "@/components/EssaySubmission";

export default function page() {
  const [show, setShow] = useState(null);
  const [title, setTitle] = useState("");
  const [essay, setEssay] = useState("");
  const [submit, setSubmit] = useState(false);
  const [essays, setEssays] = useState([]);
  const { currentUser } = useAuth();
  async function submitEssay() {
    await uploadEssay(currentUser.uid, title, essay);
    setTitle("");
    setEssay("");
    setSubmit(false);
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
  }, [currentUser]);
  return (
    <div>
      <NavBar />
      <div className="w-[95vw] md:max-w-[60vw] place-self-center">
        <div className="flex gap-4 place-items-center my-2">
          <p className="text-2xl">Written work</p>
          <button
            onClick={() => setSubmit(true)}
            className="px-1 rounded border-1 bg-yellow-100 h-[26px]"
          >
            Submit
          </button>
          <EssaySubmission
            submit={submit}
            setSubmit={setSubmit}
            setTitle={setTitle}
            title={title}
            setEssay={setEssay}
            essay={essay}
            submitEssay={submitEssay}
          />
        </div>
        <div className="flex flex-col gap-1 h-full w-full md:py-5">
          {essays &&
            essays.map((essay) => {
              return (
                <div className="">
                  <p
                    className="pl-3 italic text-l border-1 border-b-black border-r-gray-500 border-gray-100"
                    onClick={() =>
                      setShow(show == essay._id ? null : essay._id)
                    }
                  >
                    {essay.title !== "" ? essay.title : "The title is missing."}
                  </p>
                  <div
                    className={
                      show == essay._id
                        ? "box-border w-full p-10 grid grid-rows-[auto_auto] md:grid-cols-[calc(60%-8px)_40%] gap-[8px] overflow-scroll bg-blue-100"
                        : "hidden"
                    }
                  >
                    <div className="flex row-start-1 md:col-start-2 flex-col gap-1 w-full shadow p-2 bg-white">
                      <div className="whitespace-pre-wrap">
                        {essay.feedback}
                      </div>
                    </div>
                    <p className="row-start-2 md:col-start-1 whitespace-pre-wrap">
                      {essay.text}
                    </p>
                    
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
