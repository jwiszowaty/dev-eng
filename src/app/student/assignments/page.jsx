"use client";
import NavBar from "@/components/common/NavBar";
import { useAuth } from "@/contexts/AuthContext";
import { uploadEssay } from "@/lib/funcs";
import { getAssignments } from "@/services/assignmentApi";
import { useEffect, useState } from "react";
export default function Worksheets() {
  const [assignments, setAssignments] = useState([]);
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [essay, setEssay] = useState("");
  const [essaySubmission, setEssaySubmission] = useState(false);
  async function submitEssay() {
      await uploadEssay(currentUser.uid, title, essay);
      setTitle("");
      setEssay("");
      setEssaySubmission(false);
    }
  useEffect(() => {
    (async function () {
      const ownAssignments = await getAssignments(currentUser?.uid);
      setAssignments(ownAssignments);
    })();
  }, [currentUser]);

  return (
    <div>
      <NavBar />
      <div className="w-[95vw] md:max-w-[60vw] place-self-center">
        <p className="text-2xl my-2">
          Assignments
        </p>
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
        <table className="border-1 w-full">
        <thead>
          <tr className="border-1 border-b-2">
            <th className="font-normal">title</th>
            <th className="font-normal">descirption</th>
            <th className="font-normal">category</th>
            <th className="font-normal">status</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 &&
            assignments.map((assignment) => {
              let status;
              if (assignment?.category === "writing" && assignment?.status === "pending") {
                status = <button
                  className="hover:underline text-blue-700"
          onClick={() => setEssaySubmission(true)}>submit</button>
              } else {
                status = assignment?.status
              }
              return (
                <tr key={assignment._id} className="hover:bg-amber-50 h-[40px]">
                  <td className="text-center">{assignment?.title}</td>
                  <td className="text-center">{assignment?.description}</td>
                  <td className="text-center">{assignment?.category}</td>
                  <td className="text-center">{status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
