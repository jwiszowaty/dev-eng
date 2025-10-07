import { useEffect } from "react";

export default function EssaySubmission({submit, setSubmit, setTitle, title, setEssay, essay, submitEssay, assignment}) {
  useEffect(()=>{console.log(assignment);
  })
  return (
    <div
          className={`place-content-center place-items-center absolute top-0 left-0 w-screen h-dvh backdrop-blur-sm overflow-hidden ${
            submit ? "visible" : "hidden"
          }`}
        >
          <form
            className="p-1 md:p-10 pb-0 rounded-xl shadow-2xl w-[98vw] max-w-[1000px] min-w-[300px] h-[98%] flex flex-col gap-3 bg-blue-950 text-black place-items-center"
            onSubmit={(e) => {
              e.preventDefault();
              submitEssay();
            }}
          >
            <div className="flex justify-between w-full">
              <p className="place-self-center text-2xl text-white text-shadow-black text-shadow-xs font-bold">
                Essay submission
              </p>
              <p
                onClick={() => setSubmit(false)}
                className="p-1 rounded-full text-red-500 place-self-end text-center cursor-default hover:underline"
              >
                cancel
              </p>
            </div>
            <div className="flex w-full gap-3">
              <p className="text-white text-xl font-bold w-min">Title</p>
              <input
                required
                className="bg-white rounded-xl w-full px-2"
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                  console.log(title);
                }}
                defaultValue={assignment?.title}
                readOnly={assignment}
              />
            </div>
            <textarea
              required
              className="border rounded-xl flex w-1/1 h-full p-2 bg-white"
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
  )
}
